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
    public class StudentSkillsService : IStudentSkillsService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public StudentSkillsService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<StudentSkillsModel> CreateOrUpdate(StudentSkillsModel model, CancellationToken cancellationToken)
        {
            StudentSkills StudentSkills = new StudentSkills();
            if (model.Id == null)
            {
                await appDbContext.StudentSkills.AddAsync(StudentSkills);
            }
            else
            {
                StudentSkills = await appDbContext.StudentSkills.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            StudentSkills.Name = model.Name;

            await appDbContext.SaveChangesAsync();

            return await GetById(StudentSkills.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentSkills = await appDbContext.StudentSkills.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.StudentSkills.Remove(StudentSkills);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<StudentSkillsModel>> GetAll(CancellationToken cancellationToken)
        {
            var StudentSkills = await appDbContext.StudentSkills.ToListAsync(cancellationToken);

            var model = mapper.Map<List<StudentSkillsModel>>(StudentSkills);

            return model;
        }

        public async Task<StudentSkillsModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentSkills = await appDbContext.StudentSkills
                .Where(x => x.Id == Id)
                .FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<StudentSkillsModel>(StudentSkills);

            return model;
        }
        public async Task<List<ListItemModel>> GetStudentSkillsSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.StudentSkills.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }
    }
}
