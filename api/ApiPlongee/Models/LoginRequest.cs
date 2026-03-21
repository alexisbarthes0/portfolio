using System.Text.Json.Serialization;

namespace ApiPlongee.Models;

public class LoginRequest
{
    [JsonPropertyName("identifiant")]
    public string Identifiant { get; set; } = string.Empty;

    [JsonPropertyName("motDePasse")]
    public string MotDePasse { get; set; } = string.Empty;
}