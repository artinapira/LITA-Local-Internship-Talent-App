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
    public class ApplicationConfiguration : IEntityTypeConfiguration<Application>
    {
        public void Configure(EntityTypeBuilder<Application> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Job>(x => x.Job)
              .WithMany(x => x.Applications)
              .HasForeignKey(x => x.JobId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Student>(x => x.Student)
              .WithMany(x => x.Applications)
              .HasForeignKey(x => x.StudentId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
