﻿using System;
using System.Collections.Generic;

namespace DBLayer.DBLayer;

public partial class EmployeeTable
{
    public string EmployeeId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime DateOfBirth { get; set; }

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public DateTime JoinDate { get; set; }

    public string Location { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public string Department { get; set; } = null!;

    public string Manager { get; set; } = null!;

    public string Project { get; set; } = null!;
}
