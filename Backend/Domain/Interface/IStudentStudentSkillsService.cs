using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interface
{
    public interface IStudentStudentSkillsService
    {
        public Task<List<StudentStudentSkillsModel>> GetAll(CancellationToken cancellationToken);
        public Task<StudentStudentSkillsModel> GetById(Guid Id, CancellationToken cancellationToken);
        public Task<StudentStudentSkillsModel> CreateOrUpdate(StudentStudentSkillsModel model, CancellationToken cancellationToken);
        public Task DeleteById(Guid Id, CancellationToken cancellationToken);
        Task<List<StudentStudentSkillsModel>> GetAllByStudentId(Guid studentId, CancellationToken cancellationToken);
    }
}
