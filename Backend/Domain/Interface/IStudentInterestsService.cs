using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IStudentInterestsService
    {
        public Task<List<StudentInterestsModel>> GetAll(CancellationToken cancellationToken);
        public Task<StudentInterestsModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<StudentInterestsModel> CreateOrUpdate(StudentInterestsModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        Task<List<StudentInterestsModel>> GetAllByStudentId(Guid studentId, CancellationToken cancellationToken);
    }
}
