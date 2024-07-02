
namespace PTFintechTest.DTOs.Request
{
    public class UpdateTaskRequest
    {
        public required int TaskId { get; set; }
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

}