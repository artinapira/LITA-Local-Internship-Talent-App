using AutoMapper;
using Domain.Entities;
using Domain.Interface;
using Domain.Model;
using Infrastructure.Data;
using Infrastructure.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class ApplicationService: IApplicationService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;
        private readonly IHttpContextAccessor _contextAccessor;

        public ApplicationService(AppDbContext appDbContext, IMapper mapper, IHttpContextAccessor contextAccessor)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
            _contextAccessor = contextAccessor;
        }

        public async Task<ApplicationModel> CreateOrUpdate(ApplicationModel model, CancellationToken cancellationToken)
        {
            var user = _contextAccessor.HttpContext?.User;
            var userRole = user?.FindFirst(ClaimTypes.Role)?.Value
                         ?? user?.FindFirst("role")?.Value;
            bool isEmployer = userRole == "Employer";

            Console.WriteLine($"DEBUG: User role = {userRole}, isEmployer = {isEmployer}");

            var job = await appDbContext.Jobs
                .Where(j => j.Id == model.JobId)
                .FirstOrDefaultAsync(cancellationToken);

            if (job == null)
                throw new Exception("Job not found.");

            bool isUpdate = model.Id != null;

            if (isUpdate)
            {
                var existingApplication = await appDbContext.Applications
                    .Where(x => x.Id == model.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                if (existingApplication == null)
                    throw new Exception("Application not found.");

                DateTime closesAtUtc =
                    job.ClosesAt.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(job.ClosesAt, DateTimeKind.Utc)
                    : job.ClosesAt.ToUniversalTime();

                Console.WriteLine($"DEBUG: Job closes at {closesAtUtc}, UTC Now: {DateTime.UtcNow}");
                Console.WriteLine($"DEBUG: Is job closed? {DateTime.UtcNow >= closesAtUtc}");

                if (DateTime.UtcNow >= closesAtUtc && !isEmployer)
                    throw new Exception("This job is closed. You cannot update the application.");

                if (DateTime.UtcNow >= closesAtUtc && isEmployer)
                {
                    if (existingApplication.StudentId != model.StudentId ||
                        existingApplication.JobId != model.JobId ||
                        (!string.IsNullOrEmpty(model.CvFilePath) && model.CvFilePath != existingApplication.CvFilePath))
                    {
                        throw new Exception("For closed jobs, employers can only update the application status.");
                    }
                }
            }
            else
            {
                DateTime closesAtUtc =
                    job.ClosesAt.Kind == DateTimeKind.Unspecified
                    ? DateTime.SpecifyKind(job.ClosesAt, DateTimeKind.Utc)
                    : job.ClosesAt.ToUniversalTime();

                if (DateTime.UtcNow >= closesAtUtc)
                    throw new Exception("This job is closed. You cannot create a new application.");
            }

            if (!isUpdate || (model.StudentId != null && model.JobId != null))
            {
                var duplicate = await appDbContext.Applications
                    .AnyAsync(x =>
                        x.StudentId == model.StudentId &&
                        x.JobId == model.JobId &&
                        x.Id != model.Id, cancellationToken);

                if (duplicate)
                    throw new Exception("This application is already added for the student.");
            }

            JobApplication application;

            if (model.Id == null)
            {
                application = new JobApplication();
                await appDbContext.Applications.AddAsync(application);
            }
            else
            {
                application = await appDbContext.Applications
                    .Where(x => x.Id == model.Id)
                    .FirstOrDefaultAsync(cancellationToken);

                if (application == null)
                    throw new Exception("Application not found.");
            }

            application.JobId = model.JobId;
            application.StudentId = model.StudentId;
            application.Status = model.Status;
            application.AppliedAt = model.AppliedAt;

            if (!string.IsNullOrEmpty(model.CvFilePath))
                application.CvFilePath = model.CvFilePath;

            await appDbContext.SaveChangesAsync(cancellationToken);

            return await GetById(application.Id, cancellationToken);
        }


        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var application = await appDbContext.Applications.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.Applications.Remove(application);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<ApplicationModel>> GetAll(CancellationToken cancellationToken)
        {
            var applications = await appDbContext.Applications
                .Include(x => x.Job)
                .Include(x => x.Student)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<ApplicationModel>>(applications);

            return model;
        }

        public async Task<ApplicationModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var application = await appDbContext.Applications
                .Where(x => x.Id == Id)
                .Include(x => x.Job)
                .Include(x => x.Student)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<ApplicationModel>(application);

            return model;
        }
        public async Task<List<ApplicationModel>> GetApplicationsByJobId(Guid jobId, CancellationToken cancellationToken)
        {
            var applications = await appDbContext.Applications
                .Where(x => x.JobId == jobId)
                .Include(x => x.Job)
                .Include(x => x.Student)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<ApplicationModel>>(applications);

            return model;
        }
        public async Task<List<ApplicationModel>> GetApplicationsByStudentId(Guid studentId, CancellationToken cancellationToken)
        {
            var applications = await appDbContext.Applications
                .Where(x => x.StudentId == studentId)
                .Include(x => x.Job)
                .Include(x => x.Student)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<ApplicationModel>>(applications);

            return model;
        }
    }
}
