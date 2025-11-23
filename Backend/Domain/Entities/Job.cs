using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Job
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid LocationId { get; set; }
        public Location Location { get; set; }
        public Guid EmployerId { get; set; }
        public Employer Employer { get; set; }
        public Guid JobTypeId { get; set; }
        public JobType JobType { get; set; }
        public Guid StudyFieldId { get; set; }
        public StudyField StudyField { get; set; }
        public string RequiredSkills { get; set; }
        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
        public DateTime ClosesAt { get; set; }
        public decimal? Salary { get; set; }
        public ICollection<Application> Applications { get; set; } = new List<Application>();
    }
}
