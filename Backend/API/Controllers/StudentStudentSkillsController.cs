using Application.Services;
using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentStudentSkillsController : ControllerBase
    {
        private readonly IStudentStudentSkillsService _service;
        public StudentStudentSkillsController(IStudentStudentSkillsService service)
        {
            this._service = service;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var model = await _service.GetAll(cancellationToken);
            return Ok(model);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
        {
            var model = await _service.GetById(id, cancellationToken);

            return Ok(model);
        }
        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate(StudentStudentSkillsModel model, CancellationToken cancellationToken)
        {
            var StudentStudentSkills = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(StudentStudentSkills);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }

        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetSkillsByStudent(Guid studentId, CancellationToken cancellationToken)
        {
            var skills = await _service.GetAllByStudentId(studentId, cancellationToken);
            return Ok(skills);
        }

    }
}
