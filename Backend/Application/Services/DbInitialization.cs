using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class DbInitialization
    {
        private readonly AppDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public DbInitialization(AppDbContext context,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Init(CancellationToken cancellationToken)
        {
            await _context.Database.EnsureCreatedAsync();

            var roles = new[] { "Admin", "Employer", "Student" };

            foreach (var roleName in roles)
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    var role = new Role { Name = roleName, NormalizedName = roleName.ToUpper() };
                    await _roleManager.CreateAsync(role);
                }
            }
        }
    }
}
