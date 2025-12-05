using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Industry
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Job> Jobs { get; set; } = new List<Job>();
        public ICollection<EmployerIndustry> EmployerIndustry { get; set; } = new List<EmployerIndustry>();

    }
}
