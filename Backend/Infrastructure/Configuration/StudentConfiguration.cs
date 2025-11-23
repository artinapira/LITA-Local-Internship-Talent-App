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
    public class StudentConfiguration : IEntityTypeConfiguration<Student>
    {
        public void Configure(EntityTypeBuilder<Student> builder)
        {

            builder.HasOne<StudyField>(x => x.StudyField)
              .WithMany(x => x.Students)
              .HasForeignKey(x => x.StudyFieldId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Location>(x => x.Location)
              .WithMany(x => x.Students)
              .HasForeignKey(x => x.LocationId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
