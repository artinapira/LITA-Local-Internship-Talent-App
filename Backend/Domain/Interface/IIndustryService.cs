using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IIndustryService
    {
        public Task<List<IndustryModel>> GetAll(CancellationToken cancellationToken);
        public Task<IndustryModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<IndustryModel> CreateOrUpdate(IndustryModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetIndustrySelectListAsync(CancellationToken cancellationToken);
    }
}
