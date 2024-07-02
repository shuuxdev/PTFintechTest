

using System.Reflection.Metadata;
using System.Security.Claims;
using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTFintechTest.DTOs.Request;
using PTFintechTest.Models;
using PTFintechTest.Services;
using PTFintechTest.Constants;

[ApiController]
[Route("/task")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly TaskService taskService;
    private readonly IMapper mapper;

    public TaskController(TaskService taskService, IMapper mapper)
    {
        this.taskService = taskService;
        this.mapper = mapper;
    }
    [HttpGet("assigned")]
    public async Task<IActionResult> GetAssignedTasks()
    {
        string nameIdentifier = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        bool ok = Int32.TryParse(nameIdentifier, out int userId);
        if (!ok)
        {
            return BadRequest();
        }
        var tasks = await taskService.GetAssignedTask(userId);
        return Ok(tasks);
    }
    [HttpGet("all")]
    [Authorize(Roles = Authority.Admin)]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await taskService.GetAllTasks();
        return Ok(tasks);
    }
    [HttpGet("search/{keyword}")]
    public async Task<IActionResult> GetTaskByTitle(string keyword)
    {
        //Didn't imeplement rate limit for the sake of simplicity
        var tasks = await taskService.GetTasksByTitle(keyword);
        return Ok(tasks);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        var task = await taskService.GetTaskById(id);
        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] CreateTaskRequest createTaskRequest)
    {
        //Only admin can assign task to others
        bool isAdmin = User.IsInRole("Admin");
        if (createTaskRequest.AssignedTo != null && !isAdmin)
        {
            throw new Exception("You must be admin in order to assign task to others");
        }

        string nameIdentifier = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        bool ok = Int32.TryParse(nameIdentifier, out int currentUserId);
        if (!ok) return BadRequest();

        //If nobody is assigned, then by default the task will be assigned to the creator
        createTaskRequest.AssignedTo = createTaskRequest.AssignedTo ?? currentUserId;
        var task = await taskService.CreateTask(createTaskRequest);

        return RedirectToAction(nameof(GetTaskById), new { id = task.TaskId });
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {

        await taskService.DeleteTask(id);
        return Ok();
    }
    [HttpPatch]
    public async Task<IActionResult> UpdateTask([FromBody] UpdateTaskRequest updateTaskRequest)
    {
        //Only admin can assign task to others
        bool isAdmin = User.IsInRole("Admin");
        if (updateTaskRequest.AssignedTo != null && !isAdmin)
        {
            throw new Exception("You must be admin in order to assign task to others");
        }

        string nameIdentifier = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        bool ok = Int32.TryParse(nameIdentifier, out int currentUserId);
        if (!ok) return BadRequest();
        //If nobody is assigned, then by default the task will be assigned to the creator
        updateTaskRequest.AssignedTo = updateTaskRequest.AssignedTo ?? currentUserId;
        await taskService.UpdateTask(updateTaskRequest);
        return Ok();
    }
    [HttpPost("assign")]
    [Authorize(Roles = Authority.Admin)]
    public async Task<IActionResult> AssignTask([FromBody] AssignTaskRequest assignTaskRequest)
    {
        await taskService.AssignTask(assignTaskRequest);
        return Ok();
    }
}