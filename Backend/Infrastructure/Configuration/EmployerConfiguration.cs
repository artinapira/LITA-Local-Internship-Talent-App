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
    public class EmployerConfiguration : IEntityTypeConfiguration<Employer>
    {
        public void Configure(EntityTypeBuilder<Employer> builder) 
        {

            builder.HasOne<JobType>(x => x.JobType)
              .WithMany(x => x.Employers)
              .HasForeignKey(x => x.JobTypeId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Location>(x => x.Location)
              .WithMany(x => x.Employers)
              .HasForeignKey(x => x.LocationId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
