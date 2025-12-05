using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, Guid>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {}

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<JobApplication> Applications { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobType> JobTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<StudyField> StudyFields { get; set; }
        public DbSet<EmployerIndustry> EmployerIndustry { get; set; }
        public DbSet<Industry> Industries { get; set; }
        public DbSet<Interests> Interests { get; set; }
        public DbSet<StudentInterests> StudentInterests { get; set; }
        public DbSet<StudentSkills> StudentSkills { get; set; }
        public DbSet<StudentStudentSkills> StudentStudentSkills { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.Name)
                      .HasMaxLength(200);
            });

            modelBuilder.Entity<Employer>(entity =>
            {
                entity.Property(e => e.CompanyName)
                      .HasMaxLength(200);
            });
        }
    }
}
