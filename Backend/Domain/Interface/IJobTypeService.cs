using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IJobTypeService
    {
        public Task<List<JobTypeModel>> GetAll(CancellationToken cancellationToken);
        public Task<JobTypeModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<JobTypeModel> CreateOrUpdate(JobTypeModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetJobTypeSelectListAsync(CancellationToken cancellationToken);
    }
}
