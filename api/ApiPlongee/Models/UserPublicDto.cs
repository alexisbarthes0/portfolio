namespace ApiPlongee.Models;

public class UserPublicDto
{
    public string Id { get; set; } = string.Empty;
    public string Identifiant { get; set; } = string.Empty;
    public string Nom { get; set; } = string.Empty;
    public string Prenom { get; set; } = string.Empty;
    public string AdresseMail { get; set; } = string.Empty;
    public string? Niveau { get; set; }
}
