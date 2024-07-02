

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
[Route("role")]
public class RoleController : ControllerBase
{
    private readonly Repository<Role> roleRepository;
    private readonly IMapper mapper;

    public RoleController(Repository<Role> roleRepository, IMapper mapper)
    {
        this.roleRepository = roleRepository;
        this.mapper = mapper;
    }
    [HttpGet("all")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAllRoles()
    {
        var roles = await roleRepository.Get();
        return Ok(roles.ToList());
    }
}