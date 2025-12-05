using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class StudentInterests
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid InterestsId { get; set; }
        public Interests Interests { get; set; }


    }
}
