using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobService _service;
        public JobController(IJobService service)
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
        public async Task<IActionResult> CreateOrUpdate(JobModel model, CancellationToken cancellationToken)
        {
            var job = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(job);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("getByEmployerId/{employerId}")]
        public async Task<IActionResult> GetByEmployerId(Guid employerId, CancellationToken cancellationToken)
        {
            var model = await _service.GetByEmployerId(employerId, cancellationToken);
            return Ok(model);
        }
        [HttpGet("GetJob")]
        public async Task<IActionResult> GetJob(CancellationToken cancellationToken)
        {
            var model = await _service.GetJobSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
