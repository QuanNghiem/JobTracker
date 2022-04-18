using JobTracker.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace JobTracker.Services;

public class JobService
{
    private readonly IMongoCollection<Job> _jobCollection;

    public JobService(IOptions<JobsDbSettings> JobsDbSettings)
    {
        var mongoClient = new MongoClient(JobsDbSettings.Value.ConnectionString);

        var mongoDB = mongoClient.GetDatabase(JobsDbSettings.Value.DatabaseName);

        _jobCollection = mongoDB.GetCollection<Job>(JobsDbSettings.Value.JobsCollectionName);
    }

    public async Task<List<Job>> GetAsync() => await _jobCollection.Find(_ => true).ToListAsync();

    public async Task<List<Job>> GetAsync(string UserId) =>
    await _jobCollection.Find(x => x.UserId == UserId).ToListAsync();

    public async Task CreateAsync(Job newJob) =>
        await _jobCollection.InsertOneAsync(newJob);

    public async Task UpdateAsync(string id, Job updateJob) =>
        await _jobCollection.ReplaceOneAsync(x => x.Id == id, updateJob);

    public async Task RemoveAsync(string id) =>
        await _jobCollection.DeleteOneAsync(x => x.Id == id);

}