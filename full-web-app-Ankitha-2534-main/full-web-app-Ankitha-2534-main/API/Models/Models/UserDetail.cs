using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainModelLayer.Models;
public partial class UserDetail
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<UserTask> UserTasks { get; set; } = new List<UserTask>();
}
