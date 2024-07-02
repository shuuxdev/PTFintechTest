using System.Text.Json.Serialization;
using Microsoft.OpenApi.Models;
using PTFintechTest.Helpers;
using PTFintechTest.Repositories;
using PTFintechTest.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);
builder.Services.AddPostgreSqlDbContext(builder.Configuration);
builder.Services.AddScoped(typeof(Repository<>), typeof(Repository<>));
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder.WithOrigins("http://localhost:5000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        });
});
builder.Services.AddScoped<JwtHelper>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<TaskRepository>();
builder.Services.AddScoped<LabelRepository>();
builder.Services.AddScoped<PasswordHasher>();
builder.Services.AddAuthorization();

// Configure Swagger
builder.Services.AddSwaggerWithJwtAuthentication();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseStaticFiles();
app.UseMiddleware<ExceptionMiddleware>();
app.UseRouting();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve Swagger UI (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Task management system");
    // Optionally, configure the Swagger UI URL
    c.RoutePrefix = "swagger";
});

app.MapControllers();

app.Run();
