using JobTracker.Models;
using JobTracker.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : Controller
{
    // private readonly string url = "https://localhost:7091/api/";
    private readonly JobService _jobServ;

    public JobsController(JobService jobsServ) => _jobServ = jobsServ;

    [Route("~/api/allJobs")]
    [HttpGet]
    public async Task<List<Job>> Get() => await _jobServ.GetAsync();

    [Route("~/api/userJobs")]
    [HttpPost]
    public async Task<ActionResult<List<Job>>> Get(string id)
    {
        List<Job> jobs = await _jobServ.GetAsync(id);

        if (jobs is null)
        {
            return NotFound();
        }

        return jobs;
    }

    [Route("~/api/addJob")]
    [HttpPost]
    public async Task<IActionResult> Post(Job newJob)
    {
        Console.WriteLine(newJob);
        // newJob.AppliedDate = DateTime.Now;
        await _jobServ.CreateAsync(newJob);

        return CreatedAtAction(nameof(Get), new { id = newJob.Id }, newJob);
    }
}