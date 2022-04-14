using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace JobTracker.Models;

public class Job
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id
    {
        get;
        set;
    }

    [BsonElement("UserId")]
    [JsonPropertyName("UserId")]
    public string UserId { get; set; } = null!;


    [BsonElement("Applied")]
    [JsonPropertyName("Applied")]
    public DateTime AppliedDate { get; set; } = default!;

    [BsonElement("Name")]
    [JsonPropertyName("Name")]
    public string Name { get; set; } = null!;

    [BsonElement("Link")]
    [JsonPropertyName("Link")]
    public string Link { get; set; } = null!;

}