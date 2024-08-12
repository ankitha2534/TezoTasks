using System;
using System.Collections.Generic;

namespace DomainModelLayer.Models;

public partial class UserTask
{
    public int TaskId { get; set; }

    public int? UserId { get; set; }

    public string? TaskTitle { get; set; }

    public string? TaskDescription { get; set; }

    public DateTime? TaskDate { get; set; }

    public bool? IsDone { get; set; }

    public virtual UserDetail? User { get; set; }
}
