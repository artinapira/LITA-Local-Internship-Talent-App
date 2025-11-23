using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configuration
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Location>(x => x.Location)
              .WithMany(x => x.Jobs)
              .HasForeignKey(x => x.LocationId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Employer>(x => x.Employer)
              .WithMany(x => x.Jobs)
              .HasForeignKey(x => x.EmployerId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<JobType>(x => x.JobType)
              .WithMany(x => x.Jobs)
              .HasForeignKey(x => x.JobTypeId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<StudyField>(x => x.StudyField)
              .WithMany(x => x.Jobs)
              .HasForeignKey(x => x.StudyFieldId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
