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
    public class StudentInterestsMappings : Profile
    {
        public StudentInterestsMappings()
        {
            CreateMap<StudentInterests, StudentInterestsModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
               .ForMember(x => x.InterestsId, y => y.MapFrom(x => x.InterestsId))
               .ForMember(x => x.Interests, y => y.MapFrom(x => x.Interests));

            CreateMap<StudentInterestsModel, StudentInterests>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
              .ForMember(x => x.InterestsId, y => y.MapFrom(x => x.InterestsId))
              .ForMember(x => x.Interests, y => y.MapFrom(x => x.Interests));
        }
    }
}
