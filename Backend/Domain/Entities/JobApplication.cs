using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class JobApplication
    {
        public Guid Id { get; set; }
        public Guid JobId { get; set; }
        public Job Job { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get;set; }
        public Status Status { get; set; } 
        public DateTime AppliedAt { get; set; } = DateTime.UtcNow;
        public string CvFilePath { get; set; }
    }
}
