using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IJobService
    {
        public Task<List<JobModel>> GetAll(CancellationToken cancellationToken);
        public Task<JobModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<JobModel> CreateOrUpdate(JobModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        Task<List<JobModel>> GetByEmployerId(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetJobSelectListAsync(CancellationToken cancellationToken);
    }
}
