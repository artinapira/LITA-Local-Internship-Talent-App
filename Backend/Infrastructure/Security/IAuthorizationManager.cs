using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Security
{
    public interface IAuthorizationManager
    {
        Guid? GetUserId();
        bool? IsAuthenticated();
        List<Claim> GetClaims();
        string GetUserRole(); 
        bool IsEmployer();    
        bool IsStudent();
        bool IsAdmin();  
    }
}