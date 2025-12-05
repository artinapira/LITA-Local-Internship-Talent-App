using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class AuthorizationManager : IAuthorizationManager
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public string ClaimTypeName => "Id";

        public AuthorizationManager(IHttpContextAccessor httpContextAccessor)
        {
            _contextAccessor = httpContextAccessor;
        }

        private ClaimsPrincipal User => _contextAccessor.HttpContext?.User;

        public Guid? GetUserId()
        {
            var userIdClaim = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value
                           ?? User?.FindFirst("sub")?.Value
                           ?? User?.FindFirst("Id")?.Value;

            if (!string.IsNullOrEmpty(userIdClaim) && Guid.TryParse(userIdClaim, out var userId))
            {
                return userId;
            }

            var token = GetCurrentToken();
            if (string.IsNullOrEmpty(token) || token == "null")
            {
                return null;
            }

            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(token);
                var tokenS = jsonToken as JwtSecurityToken;

                var userIdFromToken = tokenS.Claims.Where(x => x.Type == "sub" || x.Type == ClaimTypes.NameIdentifier).Select(x => x.Value).FirstOrDefault();

                return userIdFromToken != null ? Guid.Parse(userIdFromToken) : null;
            }
            catch
            {
                return null;
            }
        }

        public bool? IsAuthenticated()
        {
            return User != null && User.Identity?.IsAuthenticated == true;
        }

        public List<Claim> GetClaims()
        {
            return User?.Claims.ToList() ?? new List<Claim>();
        }

        public string GetUserRole()
        {
            return User?.FindFirst(ClaimTypes.Role)?.Value
                ?? User?.FindFirst("role")?.Value
                ?? User?.FindFirst("Role")?.Value;
        }

        public bool IsEmployer()
        {
            return GetUserRole() == "Employer";
        }

        public bool IsStudent()
        {
            return GetUserRole() == "Student";
        }

        public bool IsAdmin()
        {
            return GetUserRole() == "Admin";
        }

        private string GetCurrentToken()
        {
            var token = _contextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
            if (string.IsNullOrEmpty(token))
            {
                var query = _contextAccessor.HttpContext?.Request.Query["access_token"];
                if (query.HasValue)
                {
                    return query.Value;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return token.StartsWith("Bearer ") ? token.Substring(7) : token;
            }
        }
    }
}