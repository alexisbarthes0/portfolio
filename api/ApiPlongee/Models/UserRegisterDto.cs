using System.Text.Json.Serialization;

namespace ApiPlongee.Models;

public class UserRegisterDto
{
    [JsonPropertyName("identifiant")]
    public string Identifiant { get; set; } = string.Empty;

    [JsonPropertyName("motDePasse")]
    public string MotDePasse { get; set; } = string.Empty;

    [JsonPropertyName("nom")]
    public string Nom { get; set; } = string.Empty;

    [JsonPropertyName("prenom")]
    public string Prenom { get; set; } = string.Empty;

    [JsonPropertyName("adresseMail")]
    public string AdresseMail { get; set; } = string.Empty;
}
