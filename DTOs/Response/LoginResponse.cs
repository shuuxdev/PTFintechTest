using System.ComponentModel.DataAnnotations;
using System.Net;

namespace PTFintechTest.DTOs.Response
{
    public class LoginResponse
    {

        public required string Message { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public string? Token { get; set; }
    }
}