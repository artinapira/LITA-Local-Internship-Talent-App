using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class JobModel
    {
        public Guid? Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid LocationId { get; set; }
        public Guid EmployerId { get; set; }
        public Guid JobTypeId { get; set; }
        public Guid StudyFieldId { get; set; }
        public Guid IndustryId { get; set; }
        public string RequiredSkills { get; set; }
        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
        public DateTime ClosesAt { get; set; }
        public decimal? Salary { get; set; }
    }
}
