using System;
using System.Collections.Generic;

namespace DataLayerEF.DataLayerEF;

public partial class Employee
{
    public string EmployeeId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateOnly? DateOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public DateOnly JoinDate { get; set; }

    public string Location { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public string Department { get; set; } = null!;

    public string? Manager { get; set; }

    public string? Project { get; set; }
}
