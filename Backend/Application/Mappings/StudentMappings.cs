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
    public class StudentMappings : Profile
    {
        public StudentMappings()
        {
            CreateMap<Student, StudentModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
               .ForMember(x => x.University, y => y.MapFrom(x => x.University))
               .ForMember(x => x.StudyFieldId, y => y.MapFrom(x => x.StudyFieldId))
               .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
               .ForMember(x => x.ProfileImagePath, y => y.MapFrom(x => x.ProfileImagePath))
               .ForMember(x => x.CreatedAt, y => y.MapFrom(x => x.CreatedAt));

            CreateMap<StudentModel, Student>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Name, y => y.MapFrom(x => x.Name))
               .ForMember(x => x.University, y => y.MapFrom(x => x.University))
               .ForMember(x => x.StudyFieldId, y => y.MapFrom(x => x.StudyFieldId))
               .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
               .ForMember(x => x.ProfileImagePath, y => y.MapFrom(x => x.ProfileImagePath))
               .ForMember(x => x.CreatedAt, y => y.MapFrom(x => x.CreatedAt));
        }
    }
}
