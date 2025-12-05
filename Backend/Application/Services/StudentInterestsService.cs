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
    public class StudentInterestsService : IStudentInterestsService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public StudentInterestsService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<StudentInterestsModel> CreateOrUpdate(StudentInterestsModel model, CancellationToken cancellationToken)
        {

            var duplicate = await appDbContext.StudentInterests
                   .AnyAsync(x => x.StudentId == model.StudentId
                   && x.InterestsId == model.InterestsId
                   && x.Id != model.Id, cancellationToken);

            if (duplicate)
                throw new Exception("This skill is already added for the student.");
            StudentInterests StudentInterests = new StudentInterests();
            if (model.Id == null)
            {
                await appDbContext.StudentInterests.AddAsync(StudentInterests);
            }
            else
            {
                StudentInterests = await appDbContext.StudentInterests.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            StudentInterests.StudentId = model.StudentId;
            StudentInterests.InterestsId = model.InterestsId;

            await appDbContext.SaveChangesAsync();

            return await GetById(StudentInterests.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentInterests = await appDbContext.StudentInterests.Where(x => x.Id == Id)
                .Include(x => x.Student)
                .Include(x => x.Interests)
                .FirstOrDefaultAsync(cancellationToken);

            appDbContext.StudentInterests.Remove(StudentInterests);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<StudentInterestsModel>> GetAll(CancellationToken cancellationToken)
        {
            var StudentInterests = await appDbContext.StudentInterests
                .Include(x => x.Student)
                .Include(x => x.Interests)
                .ToListAsync(cancellationToken);

            var model = mapper.Map<List<StudentInterestsModel>>(StudentInterests);

            return model;
        }

        public async Task<StudentInterestsModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var StudentInterests = await appDbContext.StudentInterests.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<StudentInterestsModel>(StudentInterests);

            return model;
        }

        public async Task<List<StudentInterestsModel>> GetAllByStudentId(Guid studentId, CancellationToken cancellationToken)
        {
            var interests = await appDbContext.StudentInterests
                .Where(x => x.StudentId == studentId)
                .Include(x => x.Interests)
                .ToListAsync(cancellationToken);

            return mapper.Map<List<StudentInterestsModel>>(interests);
        }
    }
}
