using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class EmployerIndustry
    {
        public Guid Id { get; set; }
        public Guid EmployerId { get; set; }
        public Employer Employer { get; set; }
        public Guid IndustryId { get; set; }
        public Industry Industry { get; set; }
    }
}
