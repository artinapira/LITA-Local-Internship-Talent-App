using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentSkillsController : ControllerBase
    {
        private readonly IStudentSkillsService _service;
        public StudentSkillsController(IStudentSkillsService service)
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
        public async Task<IActionResult> CreateOrUpdate(StudentSkillsModel model, CancellationToken cancellationToken)
        {
            var StudentSkills = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(StudentSkills);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetStudentSkills")]
        public async Task<IActionResult> GetStudentSkills(CancellationToken cancellationToken)
        {
            var model = await _service.GetStudentSkillsSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
