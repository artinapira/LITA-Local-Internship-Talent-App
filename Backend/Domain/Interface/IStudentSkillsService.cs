using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IStudentSkillsService
    {
        public Task<List<StudentSkillsModel>> GetAll(CancellationToken cancellationToken);
        public Task<StudentSkillsModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<StudentSkillsModel> CreateOrUpdate(StudentSkillsModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        public Task<List<ListItemModel>> GetStudentSkillsSelectListAsync(CancellationToken cancellationToken);
    }
}
