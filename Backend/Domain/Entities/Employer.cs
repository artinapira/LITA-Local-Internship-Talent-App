using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Employer:User
    {
        public string CompanyName { get; set; }
        public Guid LocationId { get; set; }
        public Location Location { get; set; }
        public Guid JobTypeId { get; set; }
        public JobType JobType { get; set; }
        public string Industry { get; set; }
        public string ProfileImagePath { get; set; }
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}
