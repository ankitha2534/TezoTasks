using System;
using System.Collections.Generic;

namespace DataLayerEF.DataLayerEF;

public partial class RoleTable
{
    public int Id { get; set; }

    public string RoleName { get; set; } = null!;

    public string RoleDepartment { get; set; } = null!;

    public string? RoleDescription { get; set; }

    public string RoleLocation { get; set; } = null!;
}
