using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IApplicationService
    {
        public Task<List<ApplicationModel>> GetAll(CancellationToken cancellationToken);
        public Task<ApplicationModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<ApplicationModel> CreateOrUpdate(ApplicationModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        Task<List<ApplicationModel>> GetApplicationsByJobId(Guid jobId, CancellationToken cancellationToken);
        Task<List<ApplicationModel>> GetApplicationsByStudentId(Guid studentId, CancellationToken cancellationToken);

    }
}
