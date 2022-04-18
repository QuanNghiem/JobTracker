using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace JobTracker.Models;

public class JobFind
{
    [BsonElement("UserId")]
    [JsonPropertyName("UserId")]
    public string UserId { get; set; } = null!;
}