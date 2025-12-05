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
    public class EmployerIndustryMappings : Profile
    {
        public EmployerIndustryMappings()
        {
            CreateMap<EmployerIndustry, EmployerIndustryModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.EmployerId, y => y.MapFrom(x => x.EmployerId))
               .ForMember(x => x.IndustryId, y => y.MapFrom(x => x.IndustryId))
               .ForMember(x => x.Industries, y => y.MapFrom(x => x.Industry));

            CreateMap<EmployerIndustryModel, EmployerIndustry>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.EmployerId, y => y.MapFrom(x => x.EmployerId))
              .ForMember(x => x.IndustryId, y => y.MapFrom(x => x.IndustryId))
              .ForMember(x => x.Industry, y => y.MapFrom(x => x.Industries));
        }
    }
}
