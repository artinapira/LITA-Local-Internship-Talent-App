using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IInterestsService
    {
        public Task<List<InterestsModel>> GetAll(CancellationToken cancellationToken);
        public Task<InterestsModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<InterestsModel> CreateOrUpdate(InterestsModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetInterestsSelectListAsync(CancellationToken cancellationToken);
    }
}
