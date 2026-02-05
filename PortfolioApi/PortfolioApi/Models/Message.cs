using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PortfolioApi.Models;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = null!;

    [BsonElement("email")]
    public string Email { get; set; } = null!;

    [BsonElement("nom")]
    public string Nom { get; set; } = null!;

    // Contenu du message, stocké sous le champ "message" dans MongoDB
    [BsonElement("message")]
    public string Texte { get; set; } = null!;

    // Date au format "DD/MM/YYYY HH:MM:SS"
    [BsonElement("date")]
    public string Date { get; set; } = null!;
}



