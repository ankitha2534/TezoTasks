using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerEF.DBModels
{
    public class Employee
    {
            public string EmployeeId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime DateOfBirth { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public DateTime JoinDate { get; set; }
            public string Location { get; set; }
            public string JobTitle { get; set; }
            public string Department { get; set; }
            public string Manager { get; set; }
            public string Project { get; set; }
    }
}
