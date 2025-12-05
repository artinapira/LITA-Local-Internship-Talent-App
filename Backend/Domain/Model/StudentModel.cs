using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class StudentModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string University { get; set; }
        public Guid StudyFieldId { get; set; }
        public Guid LocationId { get; set; }
        public string ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
