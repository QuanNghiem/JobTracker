using JobTracker.Models;
using JobTracker.Services;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    // private readonly string url = "https://localhost:7091/api/";
    private readonly UserService _userServ;

    public UsersController(UserService userServ) => _userServ = userServ;

    [Route("~/api/login")]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] User login)
    {
        var user = await Authenticate(login);
        Console.Write(user);

        if (user is null)
        {
            return new OkObjectResult(null);
        }

        return new OkObjectResult(new { Id = user.Id });
    }

    private async Task<User> Authenticate(User login)
    {
        var res = await _userServ.GetAsync(login.username);
        if (res is null)
        {
            return null;
        }
        else if (res.username.ToLower() == login.username.ToLower() &&
        res.pass.ToLower() == login.pass.ToLower())
        {
            return res;
        }
        else
        {
            return null;
        }
    }

    [Route("~/api/allUser")]
    [HttpGet]
    public async Task<List<User>> Get() => await _userServ.GetAsync();

    [Route("~/api/findUser")]
    [HttpPost]
    public async Task<ActionResult<User>> Get(string id)
    {
        User user = await _userServ.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return user;
    }

    [Route("~/api/register")]
    [HttpPost]
    public async Task<IActionResult> Post(User user)
    {
        // Console.WriteLine(user);
        // newJob.AppliedDate = DateTime.Now;
        await _userServ.CreateAsync(user);

        return CreatedAtAction(nameof(Get), new { id = user.Id });
    }
}