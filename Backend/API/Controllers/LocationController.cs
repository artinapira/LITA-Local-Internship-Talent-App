using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _service;
        public LocationController(ILocationService service)
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
        public async Task<IActionResult> CreateOrUpdate(LocationModel model, CancellationToken cancellationToken)
        {
            var location = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(location);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetLocation")]
        public async Task<IActionResult> GetLocation(CancellationToken cancellationToken)
        {
            var model = await _service.GetLocationSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("count")]
        public async Task<IActionResult> GetLocationCount(CancellationToken cancellationToken)
        {
            var count = await _service.GetLocationCount(cancellationToken);
            return Ok(count);
        }
    }
}
