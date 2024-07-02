using System;
using System.Collections.Generic;

namespace PTFintechTest.Models;

public partial class Label
{
    public int LabelId { get; set; }

    public string Name { get; set; } = null!;

    public string? Color { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}
