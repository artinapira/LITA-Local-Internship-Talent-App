using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class StudentSkills
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<StudentStudentSkills> StudentStudentSkills { get; set; } = new List<StudentStudentSkills>();

    }
}
