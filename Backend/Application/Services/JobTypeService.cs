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
    public class JobTypeService : IJobTypeService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public JobTypeService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<JobTypeModel> CreateOrUpdate(JobTypeModel model, CancellationToken cancellationToken)
        {
            JobType jobtype = new JobType();
            if (model.Id == null)
            {
                await appDbContext.JobTypes.AddAsync(jobtype);
            }
            else
            {
                jobtype = await appDbContext.JobTypes.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            jobtype.JobTypeName = model.JobTypeName;

            await appDbContext.SaveChangesAsync();

            return await GetById(jobtype.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var jobtype = await appDbContext.JobTypes.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.JobTypes.Remove(jobtype);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<JobTypeModel>> GetAll(CancellationToken cancellationToken)
        {
            var jobtypes = await appDbContext.JobTypes.ToListAsync(cancellationToken);

            var model = mapper.Map<List<JobTypeModel>>(jobtypes);

            return model;
        }

        public async Task<JobTypeModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var jobtype = await appDbContext.JobTypes.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<JobTypeModel>(jobtype);

            return model;
        }
        public async Task<List<ListItemModel>> GetJobTypeSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.JobTypes.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.JobTypeName
            }).ToListAsync();

            return model;
        }
    }
}
