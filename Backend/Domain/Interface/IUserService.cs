using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IUserService
    {
        Task<AuthenticationModel> LoginAsync(LoginModel loginModel, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditAdminAsync(UserModel model, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditStudentAsync(UserModel model, CancellationToken cancellationToken);
        Task<UserModel> AddOrEditEmployerAsync(UserModel model, CancellationToken cancellationToken);
        Task DeleteUser(Guid Id, CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllUsersAsync(CancellationToken cancellationToken);
        Task<UserModel> GetUserById(Guid userId, CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetStudentSelectListAsync(CancellationToken cancellationToken);
        Task<List<ListItemModel>> GetEmployerSelectListAsync(CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllAdminsAsync(CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllEmployersAsync(CancellationToken cancellationToken);
        Task<List<UserModel>> GetAllStudentsAsync(CancellationToken cancellationToken);
        Task<int> GetStudentCount(CancellationToken cancellationToken);
        Task<int> GetEmployerCount(CancellationToken cancellationToken);
        Task<List<UserListItemModel>> SearchUsersAsync(string role, string query, int skip, int take, CancellationToken ct);
    }
}
