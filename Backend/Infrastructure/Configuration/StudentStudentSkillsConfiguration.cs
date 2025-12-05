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
    public class StudentStudentSkillsConfiguration : IEntityTypeConfiguration<StudentStudentSkills>
    {
        public void Configure(EntityTypeBuilder<StudentStudentSkills> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne<Student>(x => x.Student)
              .WithMany(x => x.StudentStudentSkills)
              .HasForeignKey(x => x.StudentId)
              .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne<StudentSkills>(x => x.StudentSkills)
              .WithMany(x => x.StudentStudentSkills)
              .HasForeignKey(x => x.StudentSkillsId)
              .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
