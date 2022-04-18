using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace JobTracker.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id
    {
        get;
        set;
    }

    [BsonElement("username")]
    [JsonPropertyName("username")]
    public string username { get; set; } = null!;

    [BsonElement("pass")]
    [JsonPropertyName("pass")]
    public string pass { get; set; } = null!;

}