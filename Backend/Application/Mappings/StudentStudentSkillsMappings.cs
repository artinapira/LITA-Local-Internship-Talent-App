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
    public class StudentStudentSkillsMappings : Profile
    {
        public StudentStudentSkillsMappings()
        {
            CreateMap<StudentStudentSkills, StudentStudentSkillsModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
               .ForMember(x => x.StudentSkillsId, y => y.MapFrom(x => x.StudentSkillsId))
               .ForMember(x => x.StudentSkills, y => y.MapFrom(x => x.StudentSkills));

            CreateMap<StudentStudentSkillsModel, StudentStudentSkills>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
              .ForMember(x => x.StudentSkillsId, y => y.MapFrom(x => x.StudentSkillsId))
              .ForMember(x => x.StudentSkills, y => y.MapFrom(x => x.StudentSkills));
        }
    }
}
