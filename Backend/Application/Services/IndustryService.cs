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
    public class IndustryService : IIndustryService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public IndustryService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<IndustryModel> CreateOrUpdate(IndustryModel model, CancellationToken cancellationToken)
        {
            Industry industry = new Industry();
            if (model.Id == null)
            {
                await appDbContext.Industries.AddAsync(industry);
            }
            else
            {
                industry = await appDbContext.Industries.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            industry.Name = model.Name;

            await appDbContext.SaveChangesAsync();

            return await GetById(industry.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var industry = await appDbContext.Industries.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.Industries.Remove(industry);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<IndustryModel>> GetAll(CancellationToken cancellationToken)
        {
            var industry = await appDbContext.Industries.ToListAsync(cancellationToken);

            var model = mapper.Map<List<IndustryModel>>(industry);

            return model;
        }

        public async Task<IndustryModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var industry = await appDbContext.Industries.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<IndustryModel>(industry);

            return model;
        }
        public async Task<List<ListItemModel>> GetIndustrySelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Industries.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }
    }
}
