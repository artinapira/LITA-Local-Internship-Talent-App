using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class StudentInterestsModel
    {
        public Guid? Id { get; set; }
        public Guid StudentId { get; set; }
        public Guid InterestsId { get; set; }
        public InterestsModel? Interests { get; set; }
    }
}
