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
    public class StudyFieldMappings : Profile
    {
        public StudyFieldMappings()
        {
            CreateMap<StudyField, StudyFieldModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));

            CreateMap<StudyFieldModel, StudyField>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.Name, y => y.MapFrom(x => x.Name));
        }
    }
}
