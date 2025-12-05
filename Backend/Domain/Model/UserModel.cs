using Domain.Entities;
using Domain.Enum;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RoleType = Domain.Enum.RoleType;

namespace Domain.Model
{
    public class UserModel
    {
        public Guid? Id { get; set; }
        public string Email { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string? Password { get; set; } = default!;
        public RoleType? Role { get; set; } = default!;

        //Employer attributes
        public string? CompanyName { get; set; }

        //Student attributes
        public string? Name { get; set; }
        public string? University { get; set; }
        public Guid? StudyFieldId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;

        //Shared student and employer attributes
        public string? ProfileImagePath { get; set; }
        public Guid? LocationId { get; set; }
        public IFormFile? ProfileImage { get; set; }
    }
}
