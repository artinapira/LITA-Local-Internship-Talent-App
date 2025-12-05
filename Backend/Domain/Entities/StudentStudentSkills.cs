using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class StudentStudentSkills
    {
        public Guid Id { get; set; }
        public Guid StudentId { get; set; }
        public Student Student { get; set; }
        public Guid StudentSkillsId { get; set; }
        public StudentSkills StudentSkills { get; set; }
    }
}
