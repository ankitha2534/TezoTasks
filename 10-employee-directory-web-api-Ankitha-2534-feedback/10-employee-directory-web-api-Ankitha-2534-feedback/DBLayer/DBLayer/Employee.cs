using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DBLayer.DBLayer;

public partial class Employee
{
    [Required]
    [RegularExpression("^TZ\\d{4}$")]
    public string EmployeeId { get; set; } = null!;

    [Required]
    [RegularExpression("^(?! )[A-Za-z ]+$")]
    public string FirstName { get; set; } = null!;

    [Required]
    [RegularExpression("^(?! )[A-Za-z ]+$")]
    public string LastName { get; set; } = null!;

    [DataType(DataType.DateTime)]
    public DateTime? DateOfBirth { get; set; }

    [Required]
    [RegularExpression("^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+$")]
    public string Email { get; set; } = null!;

    [StringLength(10)]
    public string Phone { get; set; } = null!;

    [DataType(DataType.DateTime)]
    public DateTime? JoinDate { get; set; }

    [Required]
    [RegularExpression("^(?! )[A-Za-z ]+$")]
    public string Location { get; set; } = null!;

    [Required]
    [RegularExpression("^(?! )[A-Za-z ]+$")]
    public string JobTitle { get; set; } = null!;

    [Required]
    [RegularExpression("^(?! )[A-Za-z ]+$")]
    public string Department { get; set; } = null!;

    public string? Manager { get; set; }

    public string? Project { get; set; }
}
