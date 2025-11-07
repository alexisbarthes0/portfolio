using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using ApiPlongee.Models;
using BCrypt.Net;

namespace ApiPlongee.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public UserController()
        {
            var client = new MongoClient("mongodb://localhost:27017"); // 🔧 adapte si besoin
            var database = client.GetDatabase("plongee"); // nom de ta BDD
            _users = database.GetCollection<User>("login"); // nom de ta collection Mongo
        }

        // ✅ Route POST: /api/user/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.Identifiant) ||
                string.IsNullOrEmpty(user.MotDePasse) ||
                string.IsNullOrEmpty(user.Nom) ||
                string.IsNullOrEmpty(user.Prenom) ||
                string.IsNullOrEmpty(user.AdresseMail))
            {
                return BadRequest("Tous les champs sont requis.");
            }

            var existingUser = await _users.Find(u => u.Identifiant == user.Identifiant).FirstOrDefaultAsync();
            if (existingUser != null)
                return BadRequest("Identifiant déjà utilisé.");

            user.MotDePasse = BCrypt.Net.BCrypt.HashPassword(user.MotDePasse);
            await _users.InsertOneAsync(user);

            return Ok(new { message = "Inscription réussie !" });
        }
    }
}
