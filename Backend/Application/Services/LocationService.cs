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
    public class LocationService : ILocationService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public LocationService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<LocationModel> CreateOrUpdate(LocationModel model, CancellationToken cancellationToken)
        {
            Location location = new Location();
            if (model.Id == null)
            {
                await appDbContext.Locations.AddAsync(location);
            }
            else
            {
                location = await appDbContext.Locations.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            location.Name = model.Name;

            await appDbContext.SaveChangesAsync();

            return await GetById(location.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var location = await appDbContext.Locations.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.Locations.Remove(location);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<LocationModel>> GetAll(CancellationToken cancellationToken)
        {
            var locations = await appDbContext.Locations.ToListAsync(cancellationToken);

            var model = mapper.Map<List<LocationModel>>(locations);

            return model;
        }

        public async Task<LocationModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var location = await appDbContext.Locations.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<LocationModel>(location);

            return model;
        }
        public async Task<List<ListItemModel>> GetLocationSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.Locations.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }
        public async Task<int> GetLocationCount(CancellationToken cancellationToken)
        {
            return await appDbContext.Locations.CountAsync(cancellationToken);
        }
    }
}
