using System.Net;
using PTFintechTest.DTOs.Request;
using PTFintechTest.DTOs.Response;
using PTFintechTest.Helpers;
using PTFintechTest.Repositories;

public class AuthenticationService
{
    private readonly UserRepository userRepository;
    private readonly PasswordHasher passwordHasher;
    private readonly JwtHelper jwtHelper;

    public AuthenticationService(UserRepository userRepository, PasswordHasher passwordHasher, JwtHelper jwtHelper)
    {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.jwtHelper = jwtHelper;
    }

    public async Task<LoginResponse> ValidateCredentialAsync(LoginRequest request)
    {

        string userName = request.Username;
        var user = await userRepository.GetByUsername(userName);
        if (user == null)
        {
            throw new Exception("Username not found");
        }

        if (!passwordHasher.VerifyPassword(user.Password, request.Password))
        {
            throw new Exception("Incorrect password");
        }
        var userRoles = user.Roles.Select(role => role.Name).ToList();
        var jwtToken = jwtHelper.GenerateJwtToken(user.UserId.ToString(), user.Username, userRoles);

        return new LoginResponse()
        {
            Message = "Login successfully",
            StatusCode = HttpStatusCode.OK,
            Token = jwtToken
        };
    }

    public async Task<RegisterResponse> Register(RegisterRequest request)
    {


        // Check if username is already taken
        var user = await userRepository.GetByUsername(request.Username);
        if (user != null)
        {
            throw new Exception("Username is already exists");
        }

        // Hash the password
        var passwordHash = passwordHasher.HashPassword(request.Password);

        // Register the user
        userRepository.RegisterUser(request.Username, passwordHash, request.Email, request.Roles);

        var userRoles = new List<string>();

        // Optionally, generate a JWT token for the registered user
        var jwtToken = jwtHelper.GenerateJwtToken(userId: Guid.NewGuid().ToString(), request.Username, userRoles);

        return new RegisterResponse()
        {
            Message = "Account registered succesfully",
            StatusCode = HttpStatusCode.OK,
            Token = jwtToken
        };
    }
}