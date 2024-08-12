using System;
using System.Collections.Generic;

namespace DataLayerEF.DataLayerEF;

public partial class Role
{
    public string RoleName { get; set; } = null!;

    public string Department { get; set; } = null!;

    public string? Description { get; set; }

    public string Location { get; set; } = null!;
}
