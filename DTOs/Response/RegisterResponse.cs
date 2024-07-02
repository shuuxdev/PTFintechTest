using System.Net;

namespace PTFintechTest.DTOs.Response
{
    public class RegisterResponse
    {

        public required string Message { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public string? Token { get; set; }
    }
}