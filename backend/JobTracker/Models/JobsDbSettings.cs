namespace JobTracker.Models;

public class JobsDbSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string JobsCollectionName { get; set; } = null!;
}