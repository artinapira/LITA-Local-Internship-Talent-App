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
    public class JobMappings : Profile
    {
        public JobMappings()
        {
            CreateMap<Job, JobModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
               .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
               .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
               .ForMember(x => x.EmployerId, y => y.MapFrom(x => x.EmployerId))
               .ForMember(x => x.JobTypeId, y => y.MapFrom(x => x.JobTypeId))
               .ForMember(x => x.StudyFieldId, y => y.MapFrom(x => x.StudyFieldId))
               .ForMember(x => x.IndustryId, y => y.MapFrom(x => x.IndustryId))
               .ForMember(x => x.RequiredSkills, y => y.MapFrom(x => x.RequiredSkills))
               .ForMember(x => x.PostedAt, y => y.MapFrom(x => x.PostedAt))
               .ForMember(x => x.ClosesAt, y => y.MapFrom(x => x.ClosesAt))
               .ForMember(x => x.Salary, y => y.MapFrom(x => x.Salary));

            CreateMap<JobModel, Job>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.Title, y => y.MapFrom(x => x.Title))
               .ForMember(x => x.Description, y => y.MapFrom(x => x.Description))
               .ForMember(x => x.LocationId, y => y.MapFrom(x => x.LocationId))
               .ForMember(x => x.EmployerId, y => y.MapFrom(x => x.EmployerId))
               .ForMember(x => x.JobTypeId, y => y.MapFrom(x => x.JobTypeId))
               .ForMember(x => x.StudyFieldId, y => y.MapFrom(x => x.StudyFieldId))
               .ForMember(x => x.IndustryId, y => y.MapFrom(x => x.IndustryId))
               .ForMember(x => x.RequiredSkills, y => y.MapFrom(x => x.RequiredSkills))
               .ForMember(x => x.PostedAt, y => y.MapFrom(x => x.PostedAt))
               .ForMember(x => x.ClosesAt, y => y.MapFrom(x => x.ClosesAt))
               .ForMember(x => x.Salary, y => y.MapFrom(x => x.Salary));
        }
    }
}
