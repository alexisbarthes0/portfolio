namespace ApiPlongee.Models;

public class PlongeeCreateDto
{
    public string UserId { get; set; } = string.Empty;
    public string Lieu { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Palanquee { get; set; } = string.Empty;
    public string DirecteurPlongee { get; set; } = string.Empty;
    public int ProfMax { get; set; }
    public string? TemperatureEau { get; set; }
    public string? EspecesObservees { get; set; }
    public string? EvenementsMarquants { get; set; }
    public string? Remarques { get; set; }
    public int? Duration {get; set;}
    public string? Titre {get; set;}
}
