using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class IndustryModel
    {
        public Guid? Id { get; set; }
        public required string Name { get; set; }
    }
}
