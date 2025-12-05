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
    public class InterestsService : IInterestsService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public InterestsService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<InterestsModel> CreateOrUpdate(InterestsModel model, CancellationToken cancellationToken)
        {
            Interests Interests = new Interests();
            if (model.Id == null)
            {
                await appDbContext.Interests.AddAsync(Interests);
            }
            else
            {
                Interests = await appDbContext.Interests.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            Interests.Name = model.Name;

            await appDbContext.SaveChangesAsync();

            return await GetById(Interests.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var Interests = await appDbContext.Interests.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.Interests.Remove(Interests);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<InterestsModel>> GetAll(CancellationToken cancellationToken)
        {
            var Interests = await appDbContext.Interests.ToListAsync(cancellationToken);

            var model = mapper.Map<List<InterestsModel>>(Interests);

            return model;
        }

        public async Task<InterestsModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var Interests = await appDbContext.Interests.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<InterestsModel>(Interests);

            return model;
        }
        public async Task<List<ListItemModel>> GetInterestsSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Interests.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }
    }
}
