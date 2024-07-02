using System;
using System.Collections.Generic;

namespace PTFintechTest.Models;


public partial class Task
{
    public int TaskId { get; set; }

    public int? AssignedTo { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public string? Status { get; set; }

    public string? Priority { get; set; }

    public DateOnly? DueDate { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual User? AssignedToNavigation { get; set; }

    public virtual ICollection<Label> Labels { get; set; } = new List<Label>();
}
