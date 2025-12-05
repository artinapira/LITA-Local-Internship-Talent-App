using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Model
{
    public class UserListItemModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        // For Student
        public string? Name { get; set; }

        // For Employer
        public string? CompanyName { get; set; }

        public string? ProfileImagePath { get; set; }
    }
}
