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
    public class InterestsMappings : Profile
    {
        public InterestsMappings()
        {
            CreateMap<Interests, InterestsModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));

            CreateMap<InterestsModel, Interests>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));
        }
    }
}
