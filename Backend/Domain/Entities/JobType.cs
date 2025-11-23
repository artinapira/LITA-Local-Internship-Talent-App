using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class JobType
    {
        public Guid Id { get; set; }
        public string JobTypeName { get; set; }
        public ICollection<Employer> Employers { get; set; } = new List<Employer>();
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}
