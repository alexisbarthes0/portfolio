using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class CreateMessageDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    [Required]
    [MinLength(2)]
    public string Nom { get; set; } = null!;

    [Required]
    [MinLength(10)]
    [MaxLength(200)]
    public string Message { get; set; } = null!;
}



