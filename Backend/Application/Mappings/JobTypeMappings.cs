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
    public class JobTypeMappings : Profile
    {
        public JobTypeMappings()
        {
            CreateMap<JobType, JobTypeModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.JobTypeName, y => y.MapFrom(x => x.JobTypeName));

            CreateMap<JobTypeModel, JobType>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.JobTypeName, y => y.MapFrom(x => x.JobTypeName));
        }
    }
}
