using JobTracker.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace JobTracker.Services;

public class UserService
{
    private readonly IMongoCollection<User> _userCollection;

    public UserService(IOptions<JobsDbSettings> JobsDbSettings)
    {
        var mongoClient = new MongoClient(JobsDbSettings.Value.ConnectionString);

        var mongoDB = mongoClient.GetDatabase(JobsDbSettings.Value.DatabaseName);

        _userCollection = mongoDB.GetCollection<User>("Users");

        _userCollection.Indexes.CreateOne(
            new CreateIndexModel<User>
            (
                Builders<User>.IndexKeys.Descending(model => model.username),
                new CreateIndexOptions { Unique = true }
            )
        );
    }

    public async Task<List<User>> GetAsync() => await _userCollection.Find(_ => true).ToListAsync();

    public async Task<User> GetAsync(string username) =>
    await _userCollection.Find(x => x.username == username).FirstOrDefaultAsync();

    public async Task CreateAsync(User newJob) =>
        await _userCollection.InsertOneAsync(newJob);

    public async Task UpdateAsync(string id, User updateJob) =>
        await _userCollection.ReplaceOneAsync(x => x.Id == id, updateJob);

    public async Task RemoveAsync(string id) =>
        await _userCollection.DeleteOneAsync(x => x.Id == id);
}