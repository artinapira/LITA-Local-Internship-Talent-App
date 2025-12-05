using AutoMapper;
using Domain.Entities;
using Domain.Interface;
using Domain.Model;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StudentStudentSkillsService : IStudentStudentSkillsService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public StudentStudentSkillsService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<StudentStudentSkillsModel> CreateOrUpdate(StudentStudentSkillsModel model, CancellationToken cancellationToken)
        {
            var duplicate = await appDbContext.StudentStudentSkills
                   .AnyAsync(x => x.StudentId == model.StudentId
                   && x.StudentSkillsId == model.StudentSkillsId
                   && x.Id != model.Id, cancellationToken);

            if (duplicate)
                throw new Exception("This skill is already added for the student.");
            StudentStudentSkills StudentStudentSkills = new StudentStudentSkills();
            if (model.Id == null)
            {
                await appDbContext.StudentStudentSkills.AddAsync(StudentStudentSkills);
            }
            else
            {
                StudentStudentSkills = await appDbContext.StudentStudentSkills.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            StudentStudentSkills.StudentId = model.StudentId;
            StudentStudentSkills.StudentSkillsId = model.StudentSkillsId;

            await appDbContext.SaveChangesAsync();

            return await GetById(StudentStudentSkills.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentStudentSkills = await appDbContext.StudentStudentSkills.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.StudentStudentSkills.Remove(StudentStudentSkills);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<StudentStudentSkillsModel>> GetAll(CancellationToken cancellationToken)
        {
            var StudentStudentSkills = await appDbContext.StudentStudentSkills
                .Include(x => x.Student)
                .Include(x => x.StudentSkills)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<StudentStudentSkillsModel>>(StudentStudentSkills);

            return model;
        }

        public async Task<StudentStudentSkillsModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentStudentSkills = await appDbContext.StudentStudentSkills
                .Where(x => x.Id == Id)
                .Include(x => x.Student)
                .Include(x => x.StudentSkills)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<StudentStudentSkillsModel>(StudentStudentSkills);

            return model;
        }

        public async Task<List<StudentStudentSkillsModel>> GetAllByStudentId(Guid studentId, CancellationToken cancellationToken)
        {
            var studentSkills = await appDbContext.StudentStudentSkills
                .Where(x => x.StudentId == studentId)
                .Include(x => x.StudentSkills) 
                .ToListAsync(cancellationToken);

            return mapper.Map<List<StudentStudentSkillsModel>>(studentSkills);
        }
    }
}
