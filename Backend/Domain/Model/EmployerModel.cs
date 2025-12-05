using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class EmployerModel
    {
        public Guid? Id { get; set; }
        public string CompanyName { get; set; }
        public Guid LocationId { get; set; }
        public string ProfileImagePath { get; set; }
    }
}
