using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayerEF.DBModels
{
    public class Role
    {
            public int Id { get; set; }
            public string RoleName { get; set; }
            public string RoleDepartment { get; set; }
            public string? RoleDescription { get; set; }
            public string RoleLocation { get; set; }
    }
}
