using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Location
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Student> Students { get; set; } = new List<Student>();
        public ICollection<Employer> Employers { get; set; } = new List<Employer>();
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
    }
}
