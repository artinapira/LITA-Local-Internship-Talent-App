using Microsoft.AspNetCore.Components.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Student:User
    {
        public string Name { get; set; }
        public string University { get; set; }
        public Guid StudyFieldId { get; set; }
        public StudyField StudyField { get; set; }
        public Guid LocationId { get; set; }
        public Location Location { get; set; }
        public string Interests { get; set; }
        public string ProfileImagePath { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Application> Applications { get; set; } = new List<Application>();

    }
}
