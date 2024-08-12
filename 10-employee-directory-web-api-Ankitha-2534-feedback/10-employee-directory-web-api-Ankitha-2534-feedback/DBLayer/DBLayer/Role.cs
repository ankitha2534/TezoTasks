using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DBLayer.DBLayer;

public partial class Role
{
    [Required]
    public int RoleId { get; set; }

    [Required]
    public string RoleName { get; set; } = null!;

    [Required]
    public string Department { get; set; } = null!;

    public string? Description { get; set; }

    [Required]
    public string Location { get; set; } = null!;
}
