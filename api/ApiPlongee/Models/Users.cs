using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiPlongee.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("identifiant")]
        public string Identifiant { get; set; } = null!;

        [BsonElement("motDePasse")]
        public string MotDePasse { get; set; } = null!;

        [BsonElement("nom")]
        public string Nom { get; set; } = null!;

        [BsonElement("prenom")]
        public string Prenom { get; set; } = null!;

        [BsonElement("adresseMail")]
        public string AdresseMail { get; set; } = null!;

        [BsonElement("niveau")]
        public string Niveau { get; set; } = string.Empty;
    }
}
