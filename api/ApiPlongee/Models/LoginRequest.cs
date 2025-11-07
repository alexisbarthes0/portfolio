namespace ApiPlongee.Models
{
    public class LoginRequest
    {
        public string Identifiant { get; set; } = null!;
        public string MotDePasse { get; set; } = null!;
    }
}