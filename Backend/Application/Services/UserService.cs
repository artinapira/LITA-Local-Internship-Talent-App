using AutoMapper;
using AutoMapper.Features;
using Domain.Entities;
using Domain.Interface;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;
        private readonly IConfiguration _configuration;

        public UserService(UserManager<User> userManager, RoleManager<Role> roleManager, AppDbContext appDbContext, IMapper mapper, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.appDbContext = appDbContext;
            this.mapper = mapper;
            _configuration = configuration;
        }
        public async Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users
                .FirstOrDefaultAsync(x => x.Email == loginModel.Email, cancellationToken);

            if (user is null)
                throw new Exception("User not found");

            if (!await userManager.CheckPasswordAsync(user, loginModel.Password))
                throw new Exception("Incorrect password");

            var userRoles = await userManager.GetRolesAsync(user);
            var primaryRole = userRoles.FirstOrDefault() ?? "Unknown";

            var authClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, primaryRole),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim("sub",user.Id.ToString())

            };


            foreach (var role in userRoles)
                authClaims.Add(new Claim(ClaimTypes.Role, role));

            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JWTSettings:TokenKey"]));

            var token = new JwtSecurityToken(
                claims: authClaims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

            IdentityModelEventSource.ShowPII = true;

            var userData = mapper.Map<UserModel>(user);
            if (userRoles.Contains("Admin")) userData.Role = Domain.Enum.RoleType.Admin;
            else if (userRoles.Contains("Employer")) userData.Role = Domain.Enum.RoleType.Employer;
            else if (userRoles.Contains("Student")) userData.Role = Domain.Enum.RoleType.Student;


            await appDbContext.SaveChangesAsync(cancellationToken);

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);


            var response = new AuthenticationModel()
            {
                Token = jwtToken,
                ExpiresAt = token.ValidTo,
                UserData = userData!,
                UserRole = userRoles.FirstOrDefault()!
            };

            return response;
        }
        public async Task<UserModel> AddOrEditAdminAsync(UserModel model, CancellationToken cancellationToken)
        {
            User user;

            if (model.Id == null)
            {
                user = new User
                {
                    UserName = model.UserName,
                    Email = model.Email
                };

                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    throw new Exception(string.Join(" ; ", result.Errors.Select(e => e.Description)));

                if (!await roleManager.RoleExistsAsync("Admin"))
                    await roleManager.CreateAsync(new Role { Name = "Admin" });

                await userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
                user = await userManager.FindByIdAsync(model.Id.ToString());
                if (user == null) throw new Exception("Admin not found");

                user.UserName = model.UserName;
                user.Email = model.Email;

                if (!string.IsNullOrEmpty(model.Password))
                {
                    await userManager.RemovePasswordAsync(user);
                    await userManager.AddPasswordAsync(user, model.Password);
                }

                await userManager.UpdateAsync(user);
            }

            return model;
        }

        public async Task<UserModel> AddOrEditStudentAsync(UserModel model, CancellationToken cancellationToken)
        {
            if (!model.Id.HasValue) 
            {
                var student = new Student
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    Name = model.Name,
                    University = model.University,
                    StudyFieldId = model.StudyFieldId ?? Guid.Empty,
                    LocationId = model.LocationId ?? Guid.Empty,
                    CreatedAt = DateTime.UtcNow,
                    ProfileImagePath = model.ProfileImagePath 
                };

                var result = await userManager.CreateAsync(student, model.Password);
                if (!result.Succeeded)
                    throw new Exception(string.Join(" | ", result.Errors.Select(e => e.Description)));

                if (!await roleManager.RoleExistsAsync("Student"))
                    await roleManager.CreateAsync(new Role { Name = "Student" });

                await userManager.AddToRoleAsync(student, "Student");
                await appDbContext.SaveChangesAsync(cancellationToken);

                model.Id = student.Id;
                model.ProfileImagePath = student.ProfileImagePath;
                return model;
            }

            var existingStudent = await userManager.Users
                .OfType<Student>()
                .FirstOrDefaultAsync(x => x.Id == model.Id.Value, cancellationToken);

            if (existingStudent == null)
                throw new Exception("Student not found.");

            existingStudent.UserName = model.UserName;
            existingStudent.Email = model.Email;
            existingStudent.Name = model.Name;
            existingStudent.University = model.University;
            existingStudent.StudyFieldId = model.StudyFieldId ?? existingStudent.StudyFieldId;
            existingStudent.LocationId = model.LocationId ?? existingStudent.LocationId;

            if (!string.IsNullOrWhiteSpace(model.Password))
            {
                await userManager.RemovePasswordAsync(existingStudent);
                var result = await userManager.AddPasswordAsync(existingStudent, model.Password);
                if (!result.Succeeded)
                    throw new Exception(string.Join(" | ", result.Errors.Select(e => e.Description)));
            }

            if (!string.IsNullOrEmpty(model.ProfileImagePath))
            {
                existingStudent.ProfileImagePath = model.ProfileImagePath; 
            }

            await userManager.UpdateAsync(existingStudent);
            await appDbContext.SaveChangesAsync(cancellationToken);

            model.ProfileImagePath = existingStudent.ProfileImagePath; 
            return model;
        }

        private void SetStudentSpecificFields(User user, UserModel model)
        {
            if (user is Student student)
            {
                student.Name = model.Name;
                student.University = model.University;
                student.StudyFieldId = model.StudyFieldId ?? Guid.Empty;
                student.LocationId = model.LocationId ?? Guid.Empty;
                student.ProfileImagePath = model.ProfileImagePath;
                student.CreatedAt = model.CreatedAt ?? DateTime.UtcNow;
            }

        }
        private void SetEmployerSpecificFields(User user, UserModel model)
        {
            if (user is Employer employer)
            {
                employer.CompanyName = model.CompanyName;
                employer.LocationId = model.LocationId.Value;
                employer.ProfileImagePath = model.ProfileImagePath;
            }
        }
        public async Task<UserModel> AddOrEditEmployerAsync(UserModel model, CancellationToken cancellationToken)
        {
            if (!model.Id.HasValue)
            {
                var employer = new Employer
                {
                    UserName = model.UserName,
                    Email = model.Email,
                    CompanyName = model.CompanyName,
                    LocationId = model.LocationId ?? Guid.Empty,
                    ProfileImagePath = model.ProfileImagePath
                };

                var result = await userManager.CreateAsync(employer, model.Password);
                if (!result.Succeeded)
                    throw new Exception(string.Join(" | ", result.Errors.Select(e => e.Description)));

                if (!await roleManager.RoleExistsAsync("Employer"))
                    await roleManager.CreateAsync(new Role { Name = "Employer" });

                await userManager.AddToRoleAsync(employer, "Employer");
                await appDbContext.SaveChangesAsync(cancellationToken);

                model.Id = employer.Id;
                model.ProfileImagePath = employer.ProfileImagePath;
                return model;
            }

            var existingEmployer = await userManager.Users
                .OfType<Employer>()
                .FirstOrDefaultAsync(x => x.Id == model.Id.Value, cancellationToken);

            if (existingEmployer == null)
                throw new Exception("Employer not found.");

            existingEmployer.UserName = model.UserName;
            existingEmployer.Email = model.Email;
            existingEmployer.CompanyName = model.CompanyName;
            existingEmployer.LocationId = model.LocationId ?? existingEmployer.LocationId;

            if (!string.IsNullOrWhiteSpace(model.Password))
            {
                await userManager.RemovePasswordAsync(existingEmployer);
                var result = await userManager.AddPasswordAsync(existingEmployer, model.Password);
                if (!result.Succeeded)
                    throw new Exception(string.Join(" | ", result.Errors.Select(e => e.Description)));
            }

            if (!string.IsNullOrEmpty(model.ProfileImagePath))
            {
                existingEmployer.ProfileImagePath = model.ProfileImagePath;
            }

            await userManager.UpdateAsync(existingEmployer);
            await appDbContext.SaveChangesAsync(cancellationToken);

            model.ProfileImagePath = existingEmployer.ProfileImagePath;
            return model;
        }
        public async Task DeleteUser(Guid Id, CancellationToken cancellationToken)
        {
            var user = await userManager.FindByIdAsync(Id.ToString());

            if (user != null)
            {
                var result = await userManager.DeleteAsync(user);

                if (!result.Succeeded)
                {
                    var errorMessages = string.Join(", ", result.Errors.Select(e => e.Description));
                    throw new Exception($"Dështoi për fshirjen e përdoruesit: {errorMessages}");
                }
            }
            else
            {
                throw new Exception("Përdoruesi nuk u gjet për fshirje.");
            }
        }

        public async Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var users = await appDbContext.Users
                .ToListAsync(cancellationToken);
            var userModels = new List<UserModel>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user);
                var model = mapper.Map<UserModel>(user);

                if (roles.Contains("Admin"))
                {
                    model.Role = Domain.Enum.RoleType.Admin;
                }
                else if (roles.Contains("Employer") && user is Employer employer)
                {
                    model.Role = Domain.Enum.RoleType.Employer;
                    model.CompanyName = employer.CompanyName;
                    model.LocationId = employer.LocationId;
                    model.ProfileImagePath = employer.ProfileImagePath;
                }
                else if (roles.Contains("Student") && user is Student student)
                {
                    model.Role = Domain.Enum.RoleType.Student;
                    model.Name = student.Name;
                    model.University = student.University;
                    model.StudyFieldId = student.StudyFieldId;
                    model.LocationId = student.LocationId;
                    model.ProfileImagePath = student.ProfileImagePath;
                    model.CreatedAt = student.CreatedAt;
                }

                userModels.Add(model);
            }

            return userModels;
        }
        public async Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users
                .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);

            if (user is null)
                throw new Exception("User not found");

            var roles = await userManager.GetRolesAsync(user);
            var model = mapper.Map<UserModel>(user);

            if (roles.Contains("Admin"))
            {
                model.Role = Domain.Enum.RoleType.Admin;
            }
            else if (roles.Contains("Employer") && user is Employer employer)
            {
                model.Role = Domain.Enum.RoleType.Employer;
                model.CompanyName = employer.CompanyName;
                model.LocationId = employer.LocationId;
                model.ProfileImagePath = employer.ProfileImagePath;
            }
            else if (roles.Contains("Student") && user is Student student)
            {
                model.Role = Domain.Enum.RoleType.Student;
                model.Name = student.Name;
                model.University = student.University;
                model.StudyFieldId = student.StudyFieldId;
                model.LocationId = student.LocationId;
                model.ProfileImagePath = student.ProfileImagePath;
                model.CreatedAt = student.CreatedAt;
            }

            return model;
        }

        public async Task<List<UserModel>> GetAllAdminsAsync(CancellationToken cancellationToken)
        {
            var adminUsers = await userManager.GetUsersInRoleAsync("Admin");

            var models = new List<UserModel>();

            foreach (var user in adminUsers)
            {
                var model = mapper.Map<UserModel>(user);
                model.Role = Domain.Enum.RoleType.Admin;

                models.Add(model);
            }

            return models;
        }
        public async Task<List<UserModel>> GetAllEmployersAsync(CancellationToken cancellationToken)
        {
            var employerUsers = await userManager.GetUsersInRoleAsync("Employer");

            var models = new List<UserModel>();

            foreach (var user in employerUsers)
            {
                var model = mapper.Map<UserModel>(user);
                if (user is Employer employer)
                {
                    model.Role = Domain.Enum.RoleType.Employer;
                    model.CompanyName = employer.CompanyName;
                    model.LocationId = employer.LocationId;
                    model.ProfileImagePath = employer.ProfileImagePath;
                }

                models.Add(model);
            }

            return models;
        }
        public async Task<List<UserModel>> GetAllStudentsAsync(CancellationToken cancellationToken)
        {
            var studentUsers = await userManager.GetUsersInRoleAsync("Student");

            var models = new List<UserModel>();

            foreach (var user in studentUsers)
            {
                var model = mapper.Map<UserModel>(user);
                if (user is Student student)
                {
                    model.Role = Domain.Enum.RoleType.Student;
                    model.Name = student.Name;
                    model.University = student.University;
                    model.StudyFieldId = student.StudyFieldId;
                    model.LocationId = student.LocationId;
                    model.ProfileImagePath = student.ProfileImagePath;
                    model.CreatedAt = student.CreatedAt;
                }

                models.Add(model);
            }

            return models;
        }

        public async Task<List<ListItemModel>> GetStudentSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Students.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }

        public async Task<List<ListItemModel>> GetEmployerSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Employers.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.CompanyName
            }).ToListAsync();

            return model;
        }

        public async Task<int> GetStudentCount(CancellationToken cancellationToken)
        {
            return await appDbContext.Students.CountAsync(cancellationToken);
        }
        public async Task<int> GetEmployerCount(CancellationToken cancellationToken)
        {
            return await appDbContext.Employers.CountAsync(cancellationToken);
        }

        public async Task<List<UserListItemModel>> SearchUsersAsync(
            string role,
            string query,
            int skip,
            int take,
            CancellationToken ct)
        {
            Console.WriteLine($"🔍 Backend Search: role={role}, query={query}, skip={skip}, take={take}");

            if (string.IsNullOrWhiteSpace(query))
                return new List<UserListItemModel>();

            var lowered = query.ToLower();
            Console.WriteLine($"🔍 Lowered query: {lowered}");

            if (role.Equals("Student", StringComparison.OrdinalIgnoreCase))
            {
                var students = await appDbContext.Students
                    .Where(s =>
                        (!string.IsNullOrEmpty(s.UserName) && s.UserName.ToLower().Contains(lowered)) ||
                        (!string.IsNullOrEmpty(s.Email) && s.Email.ToLower().Contains(lowered)) ||
                        (!string.IsNullOrEmpty(s.Name) && s.Name.ToLower().Contains(lowered))
                    )
                    .OrderBy(s => s.UserName)
                    .Skip(skip)
                    .Take(take)
                    .Select(s => new UserListItemModel
                    {
                        Id = s.Id,
                        UserName = s.UserName,
                        Email = s.Email,
                        Name = s.Name,
                        ProfileImagePath = s.ProfileImagePath
                    })
                    .ToListAsync(ct);

                Console.WriteLine($"🔍 Found {students.Count} students");
                return students;
            }

            if (role.Equals("Employer", StringComparison.OrdinalIgnoreCase))
            {
                var employers = await appDbContext.Employers
                    .Where(e =>
                        (!string.IsNullOrEmpty(e.UserName) && e.UserName.ToLower().Contains(lowered)) ||
                        (!string.IsNullOrEmpty(e.Email) && e.Email.ToLower().Contains(lowered)) ||
                        (!string.IsNullOrEmpty(e.CompanyName) && e.CompanyName.ToLower().Contains(lowered))
                    )
                    .OrderBy(e => e.UserName)
                    .Skip(skip)
                    .Take(take)
                    .Select(e => new UserListItemModel
                    {
                        Id = e.Id,
                        UserName = e.UserName,
                        Email = e.Email,
                        CompanyName = e.CompanyName,
                        ProfileImagePath = e.ProfileImagePath
                    })
                    .ToListAsync(ct);

                Console.WriteLine($"🔍 Found {employers.Count} employers");

                foreach (var emp in employers)
                {
                    Console.WriteLine($"🔍 Employer: Id={emp.Id}, UserName={emp.UserName}, Email={emp.Email}, CompanyName={emp.CompanyName}");
                }

                return employers;
            }

            Console.WriteLine($"🔍 Invalid role: {role}");
            return new List<UserListItemModel>();
        }



    }

}
