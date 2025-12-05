using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IStudentService
    {
        public Task<List<StudentModel>> GetAll(CancellationToken cancellationToken);
        public Task<StudentModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<StudentModel> CreateOrUpdate(StudentModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
    }
}
