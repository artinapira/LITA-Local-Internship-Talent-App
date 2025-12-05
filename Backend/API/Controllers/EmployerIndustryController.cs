using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployerIndustryController : ControllerBase
    {
        private readonly IEmployerIndustryService _service;
        public EmployerIndustryController(IEmployerIndustryService service)
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
        public async Task<IActionResult> CreateOrUpdate(EmployerIndustryModel model, CancellationToken cancellationToken)
        {
            var EmployerIndustry = await _service.CreateOrUpdate(model, cancellationToken);

            return Ok(EmployerIndustry);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("employer/{employerId}")]
        public async Task<IActionResult> GetAllByEmployerId(Guid employerId, CancellationToken cancellationToken)
        {
            var industries = await _service.GetAllByEmployerId(employerId, cancellationToken);
            return Ok(industries);
        }
    }
}
