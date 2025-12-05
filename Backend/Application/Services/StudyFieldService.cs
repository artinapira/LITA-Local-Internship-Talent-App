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
    public class StudyFieldService : IStudyFieldService
    {
        private readonly AppDbContext appDbContext;
        private readonly IMapper mapper;

        public StudyFieldService(AppDbContext appDbContext, IMapper mapper)
        {
            this.appDbContext = appDbContext;
            this.mapper = mapper;
        }

        public async Task<StudyFieldModel> CreateOrUpdate(StudyFieldModel model, CancellationToken cancellationToken)
        {
            StudyField studyField = new StudyField();
            if (model.Id == null)
            {
                await appDbContext.StudyFields.AddAsync(studyField);
            }
            else
            {
                studyField = await appDbContext.StudyFields.Where(x => x.Id == model.Id).FirstOrDefaultAsync(cancellationToken);
            }
            studyField.Name = model.Name;

            await appDbContext.SaveChangesAsync();

            return await GetById(studyField.Id, cancellationToken);
        }

        public async Task DeleteById(Guid Id, CancellationToken cancellationToken)
        {
            var studyField = await appDbContext.StudyFields.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            appDbContext.StudyFields.Remove(studyField);
            await appDbContext.SaveChangesAsync();
        }

        public async Task<List<StudyFieldModel>> GetAll(CancellationToken cancellationToken)
        {
            var studyFields = await appDbContext.StudyFields.ToListAsync(cancellationToken);

            var model = mapper.Map<List<StudyFieldModel>>(studyFields);

            return model;
        }

        public async Task<StudyFieldModel> GetById(Guid Id, CancellationToken cancellationToken)
        {
            var studyField = await appDbContext.StudyFields.Where(x => x.Id == Id).FirstOrDefaultAsync(cancellationToken);

            var model = mapper.Map<StudyFieldModel>(studyField);

            return model;
        }
        public async Task<List<ListItemModel>> GetStudyFieldSelectListAsync(CancellationToken cancellationToken)
        {
            var model = await appDbContext.StudyFields.Select(x => new ListItemModel()
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return model;
        }
    }
}
