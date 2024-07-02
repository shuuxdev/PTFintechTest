using System.ComponentModel.DataAnnotations;

public class RegisterRequest
{
    [StringLength(maximumLength: 30)]
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Password { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required ICollection<int> Roles { get; set; }
}
