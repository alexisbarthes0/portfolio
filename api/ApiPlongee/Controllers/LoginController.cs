using Microsoft.AspNetCore.Mvc;
using ApiPlongee.Models;
using ApiPlongee.Services;

namespace ApiPlongee.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly UserService _userService;

        public LoginController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var existingUser = await _userService.GetByIdentifiantAsync(user.Identifiant);
            if (existingUser != null)
                return BadRequest("Identifiant déjà utilisé.");

            await _userService.CreateAsync(user);
            return Ok(new { message = "Utilisateur créé avec succès." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userService.GetByIdentifiantAsync(request.Identifiant);
            if (user == null)
                return Unauthorized("Identifiant invalide.");

            if (!_userService.VerifyPassword(request.MotDePasse, user.MotDePasse))
                return Unauthorized("Mot de passe incorrect.");

            return Ok(new { message = "Connexion réussie", user });
        }
    }
}