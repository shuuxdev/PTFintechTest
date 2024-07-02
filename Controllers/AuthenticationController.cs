


using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PTFintechTest.DTOs.Request;
using PTFintechTest.Repositories;

[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly AuthenticationService authenticationService;

    public AuthenticationController(IMapper mapper, AuthenticationService authenticationService)
    {
        this.mapper = mapper;
        this.authenticationService = authenticationService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await authenticationService.ValidateCredentialAsync(request);
        if (result.StatusCode == System.Net.HttpStatusCode.OK && result.Token != null)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false, // This prevents JavaScript from accessing the cookie, for the sake of simplicity of this test i'm just gonna disable it 
                SameSite = SameSiteMode.None,
                Secure = true, // Ensures the cookie is sent only over HTTPS
                Expires = DateTimeOffset.UtcNow.AddDays(7) // Adjust the expiration as needed
            };

            // Attach the token to a cookie named 'Token'
            Response.Cookies.Append("Token", result.Token, cookieOptions);
        }
        return Ok(result);
    }
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await authenticationService.Register(request);
        if (result.StatusCode == System.Net.HttpStatusCode.OK && result.Token != null)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false, // This prevents JavaScript from accessing the cookie, for the sake of simplicity of this test i'm just gonna disable it 
                SameSite = SameSiteMode.None,
                Secure = true, // Ensures the cookie is sent only over HTTPS
                Expires = DateTimeOffset.UtcNow.AddDays(7) // Adjust the expiration as needed
            };

            // Attach the token to a cookie named 'Token'
            Response.Cookies.Append("Token", result.Token, cookieOptions);
            return Ok(result);

        }
        throw new Exception("Failed to register the user");
    }
}