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
    public class EmployerIndustryService : IEmployerIndustryService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public EmployerIndustryService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<EmployerIndustryModel> CreateOrUpdate(EmployerIndustryModel model, CancellationToken cancellationToken)
        {
            EmployerIndustry EmployerIndustry = new EmployerIndustry();
            if (model.Id == null)
            {
                await appDbContext.EmployerIndustry.AddAsync(EmployerIndustry);
            }
            else
            {
                EmployerIndustry = await appDbContext.EmployerIndustry.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            EmployerIndustry.EmployerId = model.EmployerId;
            EmployerIndustry.IndustryId = model.IndustryId;

            await appDbContext.SaveChangesAsync();

            return await GetById(EmployerIndustry.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var EmployerIndustry = await appDbContext.EmployerIndustry.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.EmployerIndustry.Remove(EmployerIndustry);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<EmployerIndustryModel>> GetAll(CancellationToken cancellationToken)
        {
            var EmployerIndustry = await appDbContext.EmployerIndustry
                .Include(x => x.Employer)
                .Include(x => x.Industry)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<EmployerIndustryModel>>(EmployerIndustry);

            return model;
        }

        public async Task<EmployerIndustryModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var EmployerIndustry = await appDbContext.EmployerIndustry
                .Where(x => x.Id == Id)
                .Include(x => x.Employer)
                .Include(x => x.Industry)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<EmployerIndustryModel>(EmployerIndustry);

            return model;
        }

        public async Task<List<EmployerIndustryModel>> GetAllByEmployerId(Guid employerId, CancellationToken cancellationToken)
        {
            var industries = await appDbContext.EmployerIndustry
                .Where(x => x.EmployerId == employerId)
                .Include(x => x.Industry)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<EmployerIndustryModel>>(industries);
        }
    }
}
