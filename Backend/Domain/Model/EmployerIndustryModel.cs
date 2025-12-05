using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class EmployerIndustryModel
    {
        public Guid? Id { get; set; }
        public Guid EmployerId { get; set; }
        public Guid IndustryId { get; set; }
        public IndustryModel? Industries { get; set; }
    }
}
