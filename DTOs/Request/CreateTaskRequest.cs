using System.Reflection.Emit;

namespace PTFintechTest.DTOs.Request
{
    public class CreateTaskRequest
    {
        public int? AssignedTo { get; set; }

        public required string Title { get; set; }

        public string? Description { get; set; }

        public string? Status { get; set; }

        public string? Priority { get; set; }

        public DateOnly? DueDate { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public ICollection<LabelDto>? Labels { get; set; }
    }
    public class LabelDto
    {
        public int LabelId { get; set; }
    }
}