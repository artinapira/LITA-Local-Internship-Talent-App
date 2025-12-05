using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IStudyFieldService
    {
        public Task<List<StudyFieldModel>> GetAll(CancellationToken cancellationToken);
        public Task<StudyFieldModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<StudyFieldModel> CreateOrUpdate(StudyFieldModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetStudyFieldSelectListAsync(CancellationToken cancellationToken);
    }
}
