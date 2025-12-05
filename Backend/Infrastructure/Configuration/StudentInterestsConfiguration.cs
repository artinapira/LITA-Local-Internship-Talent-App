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
    public class StudentInterestsConfiguration : IEntityTypeConfiguration<StudentInterests>
    {
        public void Configure(EntityTypeBuilder<StudentInterests> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Student>(x => x.Student)
              .WithMany(x => x.StudentInterests)
              .HasForeignKey(x => x.StudentId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<Interests>(x => x.Interests)
              .WithMany(x => x.StudentInterests)
              .HasForeignKey(x => x.InterestsId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
