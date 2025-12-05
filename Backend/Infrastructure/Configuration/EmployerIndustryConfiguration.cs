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
    internal class EmployerIndustryConfiguration : IEntityTypeConfiguration<EmployerIndustry>
    {
        public void Configure(EntityTypeBuilder<EmployerIndustry> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Employer>(x => x.Employer)
              .WithMany(x => x.EmployerIndustry)
              .HasForeignKey(x => x.EmployerId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Industry>(x => x.Industry)
              .WithMany(x => x.EmployerIndustry)
              .HasForeignKey(x => x.IndustryId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
