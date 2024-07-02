using System.ComponentModel.DataAnnotations;

namespace PTFintechTest.DTOs.Request
{
    public class LoginRequest
    {

        [StringLength(maximumLength: 30)]
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }

    }
}