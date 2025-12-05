using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InterestsController : ControllerBase
    {
        private readonly IInterestsService _service;
        public InterestsController(IInterestsService service)
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
        public async Task<IActionResult> CreateOrUpdate(InterestsModel model, CancellationToken cancellationToken)
        {
            var Interests = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(Interests);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetInterests")]
        public async Task<IActionResult> GetInterests(CancellationToken cancellationToken)
        {
            var model = await _service.GetInterestsSelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
