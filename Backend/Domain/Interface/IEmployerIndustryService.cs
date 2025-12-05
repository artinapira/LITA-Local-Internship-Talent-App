using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IEmployerIndustryService
    {
        public Task<List<EmployerIndustryModel>> GetAll(CancellationToken cancellationToken);
        public Task<EmployerIndustryModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<EmployerIndustryModel> CreateOrUpdate(EmployerIndustryModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        Task<List<EmployerIndustryModel>> GetAllByEmployerId(Guid employerId, CancellationToken cancellationToken);
    }
}
