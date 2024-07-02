

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
using PTFintechTest.Repositories;

[ApiController]
[Route("/user")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserRepository userRepository;
    private readonly IMapper mapper;

    public UserController(UserRepository userRepository, IMapper mapper)
    {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }
    [HttpGet("search")]
    public async Task<IActionResult> SearchUser(string? keyword)
    {
        if (keyword == null)
        {
            var users = await userRepository.Get();
            return Ok(users.ToList());
        }
        else
        {
            var users = await userRepository.SearchUserByUsername(keyword);
            return Ok(users);
        }
    }
    [HttpGet("role")]
    public async Task<IActionResult> GetUserRole(int userId)
    {
        var roles = await userRepository.GetUserRolesAsync(userId);
        return Ok(new { role = roles });
    }
    [HttpGet]
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await userRepository.GetById(id);
        return Ok(user);
    }

}