using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
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
        public async Task<IActionResult> Register([FromBody] UserRegisterDto? dto)
        {
            if (dto == null)
                return BadRequest("Corps de requête invalide.");

            if (string.IsNullOrWhiteSpace(dto.Identifiant) ||
                string.IsNullOrWhiteSpace(dto.MotDePasse) ||
                string.IsNullOrWhiteSpace(dto.Nom) ||
                string.IsNullOrWhiteSpace(dto.Prenom) ||
                string.IsNullOrWhiteSpace(dto.AdresseMail))
            {
                return BadRequest("Tous les champs sont requis.");
            }

            var identifiant = dto.Identifiant.Trim();
            var existingUser = await _userService.GetByIdentifiantAsync(identifiant);
            if (existingUser != null)
                return BadRequest("Identifiant déjà utilisé.");

            var user = new User
            {
                Identifiant = identifiant,
                MotDePasse = dto.MotDePasse,
                Nom = dto.Nom.Trim(),
                Prenom = dto.Prenom.Trim(),
                AdresseMail = dto.AdresseMail.Trim(),
                Niveau = string.Empty
            };

            try
            {
                await _userService.CreateAsync(user);
            }
            catch (MongoWriteException ex) when (ex.WriteError?.Code == 11000)
            {
                return BadRequest("Identifiant déjà utilisé.");
            }

            return Ok(new { message = "Utilisateur créé avec succès." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest? request)
        {
            if (request == null)
                return BadRequest("Corps de requête invalide.");
            if (string.IsNullOrWhiteSpace(request.Identifiant) || string.IsNullOrWhiteSpace(request.MotDePasse))
                return BadRequest("Identifiant et mot de passe sont requis.");

            var user = await _userService.GetByIdentifiantAsync(request.Identifiant.Trim());
            if (user == null)
                return Unauthorized("Identifiant invalide.");

            if (!await _userService.VerifyPasswordAsync(request.MotDePasse, user))
                return Unauthorized("Mot de passe incorrect.");

            var dto = new UserPublicDto
            {
                Id = user.Id,
                Identifiant = user.Identifiant,
                Nom = user.Nom,
                Prenom = user.Prenom,
                AdresseMail = user.AdresseMail,
                Niveau = user.Niveau
            };

            return Ok(new { message = "Connexion réussie", user = dto });
        }
    }
}