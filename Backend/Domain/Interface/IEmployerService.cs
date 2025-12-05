using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IEmployerService
    {
        public Task<List<EmployerModel>> GetAll(CancellationToken cancellationToken);
        public Task<EmployerModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<EmployerModel> CreateOrUpdate(EmployerModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
    }
}
