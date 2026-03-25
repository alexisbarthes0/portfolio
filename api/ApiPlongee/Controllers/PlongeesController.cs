using Microsoft.AspNetCore.Mvc;
using ApiPlongee.Models;
using ApiPlongee.Services;
using MongoDB.Bson;

namespace ApiPlongee.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlongeesController : ControllerBase
{
    private readonly PlongeeService _plongeeService;

    public PlongeesController(PlongeeService plongeeService)
    {
        _plongeeService = plongeeService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Plongee>>> GetByUser([FromQuery] string userId)
    {
        if (string.IsNullOrWhiteSpace(userId) || !ObjectId.TryParse(userId, out _))
            return BadRequest("userId invalide.");

        var list = await _plongeeService.GetByUserIdAsync(userId);
        return Ok(list);
    }

    [HttpPost]
    public async Task<ActionResult<Plongee>> Create([FromBody] PlongeeCreateDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.UserId) || !ObjectId.TryParse(dto.UserId, out _))
            return BadRequest("userId invalide.");
        if (string.IsNullOrWhiteSpace(dto.Lieu))
            return BadRequest("Le lieu est requis.");
        if (string.IsNullOrWhiteSpace(dto.DirecteurPlongee))
            return BadRequest("Le directeur de plongée est requis.");
        //modif
        // if (string.IsNullOrWhiteSpace(dto.Titre))
        //     return BadRequest("Le titre est requis.");
        //fin modif
        var plongee = new Plongee
        {
            UserId = dto.UserId,
            Lieu = dto.Lieu.Trim(),
            Date = dto.Date,
            Palanquee = dto.Palanquee?.Trim() ?? string.Empty,
            DirecteurPlongee = dto.DirecteurPlongee.Trim(),
            ProfMax = dto.ProfMax,
            TemperatureEau = string.IsNullOrWhiteSpace(dto.TemperatureEau) ? null : dto.TemperatureEau.Trim(),
            EspecesObservees = string.IsNullOrWhiteSpace(dto.EspecesObservees) ? null : dto.EspecesObservees.Trim(),
            EvenementsMarquants = string.IsNullOrWhiteSpace(dto.EvenementsMarquants) ? null : dto.EvenementsMarquants.Trim(),
            Remarques = string.IsNullOrWhiteSpace(dto.Remarques) ? null : dto.Remarques.Trim(),
            // Compat: l'app avait déjà un champ "Duree" (duree) exposé côté front
            Duree = dto.Duration ?? 0,
            Duration = dto.Duration,
            Titre = string.IsNullOrWhiteSpace(dto.Titre) ? null : dto.Titre.Trim(),
        };

        var created = await _plongeeService.CreateAsync(plongee);
        return Ok(created);
    }
}
