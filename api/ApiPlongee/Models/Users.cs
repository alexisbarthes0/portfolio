using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using MongoDB.Bson.Serialization.Attributes;

namespace ApiPlongee.Models
{
    [BsonIgnoreExtraElements] // ignore any fields not mapped (ex: "type")
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nom")]
        public string Nom { get; set; }

        [BsonElement("prenom")]
        public string Prenom { get; set; }

        [BsonElement("adresse_mail")]
        public string AdresseMail { get; set; }

        [BsonElement("identifiant")]
        public string Identifiant { get; set; }

        [BsonElement("mot_de_passe")]
        public string MotDePasse { get; set; }

        [BsonElement("niveau")]
        public string Niveau { get; set; }
    }
}
