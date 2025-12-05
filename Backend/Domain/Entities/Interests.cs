using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Interests
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<StudentInterests> StudentInterests { get; set; } = new List<StudentInterests>();
    }
}
