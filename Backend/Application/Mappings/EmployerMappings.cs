using AutoMapper;
using Domain.Entities;
using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mappings
{
    public class EmployerMappings : Profile
    {
        public EmployerMappings()
        {
            CreateMap<Employer, EmployerModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.CompanyName, y => y.MapFrom(x => x.CompanyName))
               .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
               .ForMember(x => x.ProfileImagePath, y => y.MapFrom(x => x.ProfileImagePath));

            CreateMap<EmployerModel, Employer>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.CompanyName, y => y.MapFrom(x => x.CompanyName))
              .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
              .ForMember(x => x.ProfileImagePath, y => y.MapFrom(x => x.ProfileImagePath));
        }
    }
}
