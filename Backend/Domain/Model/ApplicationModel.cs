using Domain.Entities;
using Domain.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class ApplicationModel
    {
        public Guid? Id { get; set; }
        public Guid JobId { get; set; }
        public Guid StudentId { get; set; }
        public Status Status { get; set; }
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        public string? CvFilePath { get; set; }
        public IFormFile? CvFile { get; set; }
    }
}
