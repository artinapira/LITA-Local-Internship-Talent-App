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
    public class IndustryConfiguration : IEntityTypeConfiguration<Industry>
    {
        public void Configure(EntityTypeBuilder<Industry> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
