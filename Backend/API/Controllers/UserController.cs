using Domain.Interface;
using Domain.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            this._service = service;
        }
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationModel>> Login([FromBody] LoginModel loginModel, CancellationToken cancellationToken)
        {
            var result = await _service.LoginAsync(loginModel, cancellationToken);
            return Ok(result);
        }

        [HttpPost("admin")]
        public async Task<IActionResult> AddOrEditAdminAsync(UserModel model, CancellationToken cancellationToken)
        {
            var user = await _service.AddOrEditAdminAsync(model, cancellationToken);

            return Ok(user);
        }

        [HttpPost("student")]
        public async Task<IActionResult> AddOrEditStudentAsync([FromForm] UserModel model, CancellationToken cancellationToken)
        {
            if (model.ProfileImage != null)
            {
                if (!string.IsNullOrEmpty(model.ProfileImagePath))
                {
                    var oldPath = Path.Combine("wwwroot", model.ProfileImagePath.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath))
                        System.IO.File.Delete(oldPath);
                }

                var folderPath = Path.Combine("wwwroot", "uploads", "profiles");
                Directory.CreateDirectory(folderPath);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.ProfileImage.FileName)}";
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ProfileImage.CopyToAsync(stream, cancellationToken);
                }

                model.ProfileImagePath = $"/uploads/profiles/{fileName}";
            }

            var user = await _service.AddOrEditStudentAsync(model, cancellationToken);
            return Ok(user);
        }



        [HttpPost("employer")]
        public async Task<IActionResult> AddOrEditEmployerAsync([FromForm] UserModel model, CancellationToken cancellationToken)
        {
            if (model.ProfileImage != null)
            {
                if (!string.IsNullOrEmpty(model.ProfileImagePath))
                {
                    var oldPath = Path.Combine("wwwroot", model.ProfileImagePath.TrimStart('/'));
                    if (System.IO.File.Exists(oldPath))
                        System.IO.File.Delete(oldPath);
                }

                var folderPath = Path.Combine("wwwroot", "uploads", "profiles");
                Directory.CreateDirectory(folderPath);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.ProfileImage.FileName)}";
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ProfileImage.CopyToAsync(stream, cancellationToken);
                }

                model.ProfileImagePath = $"/uploads/profiles/{fileName}";
            }

            var user = await _service.AddOrEditEmployerAsync(model, cancellationToken);
            return Ok(user);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id, CancellationToken cancellationToken)
        {
            await _service.DeleteUser(id, cancellationToken);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersAsync(CancellationToken cancellationToken)
        {
            var model = await _service.GetAllUsersAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id, CancellationToken cancellationToken)
        {
            var model = await _service.GetUserById(id, cancellationToken);

            return Ok(model);
        }

        [HttpGet("admins")]
        public async Task<IActionResult> GetAllAdminsAsync(CancellationToken cancellationToken)
        {
            var model = await _service.GetAllAdminsAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("employers")]
        public async Task<IActionResult> GetAllEmployersAsync(CancellationToken cancellationToken)
        {
            var model = await _service.GetAllEmployersAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("students")]
        public async Task<IActionResult> GetAllStudentsAsync(CancellationToken cancellationToken)
        {
            var model = await _service.GetAllStudentsAsync(cancellationToken);
            return Ok(model);
        }

        [HttpGet("GetStudent")]
        public async Task<IActionResult> GetStudent(CancellationToken cancellationToken)
        {
            var model = await _service.GetStudentSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("GetEmployer")]
        public async Task<IActionResult> GetEmployer(CancellationToken cancellationToken)
        {
            var model = await _service.GetEmployerSelectListAsync(cancellationToken);
            return Ok(model);
        }
        [HttpGet("studentCount")]
        public async Task<IActionResult> GetStudentCount(CancellationToken cancellationToken)
        {
            var count = await _service.GetStudentCount(cancellationToken);
            return Ok(count);
        }
        [HttpGet("employerCount")]
        public async Task<IActionResult> GetEmployerCount(CancellationToken cancellationToken)
        {
            var count = await _service.GetEmployerCount(cancellationToken);
            return Ok(count);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(
            [FromQuery] string role,
            [FromQuery] string query,
            [FromQuery] int skip = 0,
            [FromQuery] int take = 20,
            CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(role))
                return BadRequest("Role is required.");

            if (string.IsNullOrWhiteSpace(query))
                return Ok(new List<UserListItemModel>());

            // Call service
            var results = await _service.SearchUsersAsync(role, query, skip, take, cancellationToken);
            return Ok(results);
        }


    }
}
