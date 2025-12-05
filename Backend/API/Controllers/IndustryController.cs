using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndustryController : ControllerBase
    {
        private readonly IIndustryService _service;
        public IndustryController(IIndustryService service)
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
        public async Task<IActionResult> CreateOrUpdate(IndustryModel model, CancellationToken cancellationToken)
        {
            var Industry = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(Industry);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("GetIndustry")]
        public async Task<IActionResult> GetIndustry(CancellationToken cancellationToken)
        {
            var model = await _service.GetIndustrySelectListAsync(cancellationToken);
            return Ok(model);
        }
    }
}
