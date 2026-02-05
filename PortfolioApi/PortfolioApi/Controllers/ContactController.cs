using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly MessageService _messageService;

    public ContactController(MessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CreateMessageDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var now = DateTime.Now;

        var message = new Message
        {
            Email = dto.Email,
            Nom = dto.Nom,
            Texte = dto.Message,
            Date = now.ToString("dd/MM/yyyy HH:mm:ss")
        };

        await _messageService.CreateAsync(message);

        return Ok();
    }
}



