using AutoMapper;
using Domain.Entities;
using Domain.Interface;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class JobService : IJobService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public JobService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<JobModel> CreateOrUpdate(JobModel model, CancellationToken cancellationToken)
        {
            Job job = new Job();
            if (model.Id == null)
            {
                await appDbContext.Jobs.AddAsync(job);
            }
            else
            {
                job = await appDbContext.Jobs.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            job.Title = model.Title;
            job.Description = model.Description;
            job.LocationId = model.LocationId;
            job.EmployerId = model.EmployerId;
            job.JobTypeId = model.JobTypeId;
            job.StudyFieldId = model.StudyFieldId;
            job.IndustryId = model.IndustryId;
            job.RequiredSkills = model.RequiredSkills;
            job.PostedAt = model.PostedAt;
            job.ClosesAt = model.ClosesAt;
            job.Salary = model.Salary;

            await appDbContext.SaveChangesAsync();

            return await GetById(job.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var job = await appDbContext.Jobs
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            appDbContext.Jobs.Remove(job);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<JobModel>> GetAll(CancellationToken cancellationToken)
        {
            var jobs = await appDbContext.Jobs
                .Include(x => x.Employer)
                .Include(x => x.JobType)
                .Include(x => x.StudyField)
                .Include(x => x.Industry)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<JobModel>>(jobs);

            return model;
        }

        public async Task<JobModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var job = await appDbContext.Jobs.Where(x => x.Id == Id)
                .Include(x => x.Employer)
                .Include(x => x.JobType)
                .Include(x => x.StudyField)
                .Include(x => x.Industry)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<JobModel>(job);

            return model;
        }
        public async Task<List<JobModel>> GetByEmployerId(Guid Id, CancellationToken cancellationToken)
        {
            var job = await appDbContext.Jobs.Where(x => x.EmployerId == Id)
                .Include(x => x.Employer)
                .Include(x => x.JobType)
                .Include(x => x.StudyField)
                .Include(x => x.Industry)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<JobModel>>(job);

            return model;
        }
        public async Task<List<ListItemModel>> GetJobSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Jobs.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Title
            }).ToListAsync();

            return model;
        }
    }
}
