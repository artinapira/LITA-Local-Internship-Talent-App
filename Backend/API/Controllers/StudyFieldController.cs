using Domain.Entities;
using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudyFieldController : ControllerBase
    {
        private readonly IStudyFieldService _service;
        public StudyFieldController(IStudyFieldService service)
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
        public async Task<IActionResult> CreateOrUpdate(StudyFieldModel model, CancellationToken cancellationToken)
        {
            var studyField = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(studyField);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetStudyField")]
        public async Task<IActionResult> GetStudyField(CancellationToken cancellationToken)
        {
            var model = await _service.GetStudyFieldSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
