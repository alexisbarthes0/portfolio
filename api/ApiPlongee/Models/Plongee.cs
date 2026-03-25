using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ApiPlongee.Models;

[BsonIgnoreExtraElements]
public class Plongee
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("userId")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string UserId { get; set; } = string.Empty;

    public int Numero { get; set; }
    public string Lieu { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public int ProfMax { get; set; }
    public int Duree { get; set; }
    public Gaz Gaz { get; set; } = new();
    public string Description { get; set; } = string.Empty;
    public string Palanquee { get; set; } = string.Empty;

    [BsonElement("directeurPlongee")]
    public string DirecteurPlongee { get; set; } = string.Empty;

    [BsonElement("temperatureEau")]
    public string? TemperatureEau { get; set; }

    [BsonElement("especesObservees")]
    public string? EspecesObservees { get; set; }

    [BsonElement("evenementsMarquants")]
    public string? EvenementsMarquants { get; set; }

    [BsonElement("remarques")]
    public string? Remarques { get; set; }
    //Début modif
    [BsonElement("duration")]
    public int? Duration { get; set; }
    [BsonElement("titre")]
    public string? Titre { get; set; }
    //fin modif
}

public class Gaz
{
    public int TauxAzote { get; set; }
    public int TauxO2 { get; set; }
}
