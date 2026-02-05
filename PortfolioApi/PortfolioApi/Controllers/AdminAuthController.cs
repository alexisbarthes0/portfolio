using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

public class AdminLoginRequest
{
    public string Login { get; set; } = null!;
    public string Password { get; set; } = null!;
}

[ApiController]
[Route("api/admin")]
public class AdminAuthController : ControllerBase
{
    private readonly AdminLoginService _adminLoginService;

    public AdminAuthController(AdminLoginService adminLoginService)
    {
        _adminLoginService = adminLoginService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AdminLoginRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var admin = await _adminLoginService.GetByLoginAsync(request.Login);
        if (admin is null)
        {
            return Unauthorized("Identifiant ou mot de passe incorrect.");
        }

        var isValid = _adminLoginService.VerifyPassword(request.Password, admin.PasswordHash);
        if (!isValid)
        {
            return Unauthorized("Identifiant ou mot de passe incorrect.");
        }

        return Ok(new { success = true });
    }
}


