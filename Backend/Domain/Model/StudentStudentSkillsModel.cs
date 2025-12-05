using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class StudentStudentSkillsModel
    {
        public Guid? Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid StudentSkillsId { get; set; }

        public StudentSkillsModel? StudentSkills { get; set; }
    }
}
