using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobTypeController : ControllerBase
    {
        private readonly IJobTypeService _service;
        public JobTypeController(IJobTypeService service)
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
        public async Task<IActionResult> CreateOrUpdate(JobTypeModel model, CancellationToken cancellationToken)
        {
            var jobtype = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(jobtype);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetJobTypes")]
        public async Task<IActionResult> GetJobTypes(CancellationToken cancellationToken)
        {
            var model = await _service.GetJobTypeSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
