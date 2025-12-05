using Application.Services;
using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationService _service;
        public ApplicationController(IApplicationService service)
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
        [HttpGet("test-context")]
        public IActionResult TestContext()
        {
            var user = HttpContext.User;
            var claims = user.Claims.Select(c => new { c.Type, c.Value }).ToList();

            return Ok(new
            {
                IsAuthenticated = user.Identity?.IsAuthenticated,
                Claims = claims,
                Role = user.FindFirst(ClaimTypes.Role)?.Value,
                RoleFromRoleClaim = user.FindFirst("role")?.Value,
                NameIdentifier = user.FindFirst(ClaimTypes.NameIdentifier)?.Value
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrUpdate([FromForm] ApplicationModel model, CancellationToken cancellationToken)
        {
            var cvPath = Path.Combine("C:\\LITA_Uploads", "cv");
            Directory.CreateDirectory(cvPath);

            if (model.CvFile != null)
            {
                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.CvFile.FileName)}";
                var filePath = Path.Combine(cvPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.CvFile.CopyToAsync(stream, cancellationToken);
                }

                model.CvFilePath = "/uploads/cv/" + fileName;

            }

            if (model.Id == null && string.IsNullOrEmpty(model.CvFilePath))
            {
                return BadRequest(new { CvFilePath = "CV is required when creating an application." });
            }

            try
            {
                var result = await _service.CreateOrUpdate(model, cancellationToken);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteById(id, cancellationToken);
            return Ok();
        }
        [HttpGet("getByJobId/{jobId}")]
        public async Task<IActionResult> GetApplicationsByJobId(Guid jobId, CancellationToken cancellationToken)
        {
            var model = await _service.GetApplicationsByJobId(jobId, cancellationToken);
            return Ok(model);
        }
        [HttpGet("getByStudentId/{studentId}")]
        public async Task<IActionResult> GetByStudentId(Guid studentId, CancellationToken cancellationToken)
        {
            var model = await _service.GetApplicationsByStudentId(studentId, cancellationToken);
            return Ok(model);
        }

        [HttpGet("Download/{fileName}")]
        public IActionResult DownloadCV(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("Filename is required");

            var folderPath = Path.Combine("C:\\LITA_Uploads", "cv");
            var filePath = Path.Combine(folderPath, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found");

            var contentType = "application/octet-stream";
            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            return File(fileBytes, contentType, fileName);
        }


    }
}
