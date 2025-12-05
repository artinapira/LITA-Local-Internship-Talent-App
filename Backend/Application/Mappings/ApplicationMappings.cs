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
    public class ApplicationMappings : Profile
    {
        public ApplicationMappings()
        {
            CreateMap<JobApplication, ApplicationModel>()
               .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
               .ForMember(x => x.JobId, y => y.MapFrom(x => x.JobId))
               .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
               .ForMember(x => x.Status, y => y.MapFrom(x => x.Status))
               .ForMember(x => x.AppliedAt, y => y.MapFrom(x => x.AppliedAt))
               .ForMember(x => x.CvFilePath, y => y.MapFrom(x => x.CvFilePath));

            CreateMap<ApplicationModel, JobApplication>()
              .ForMember(x => x.Id, y => y.MapFrom(x => x.Id))
              .ForMember(x => x.JobId, y => y.MapFrom(x => x.JobId))
              .ForMember(x => x.StudentId, y => y.MapFrom(x => x.StudentId))
              .ForMember(x => x.Status, y => y.MapFrom(x => x.Status))
              .ForMember(x => x.AppliedAt, y => y.MapFrom(x => x.AppliedAt))
              .ForMember(x => x.CvFilePath, y => y.MapFrom(x => x.CvFilePath));
        }
    }
}
