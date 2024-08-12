using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApplicationLayerEF
{
    public class Role
    {
        //required--->Keyword can also be used instead of constructor to make sure that field should contain an input
        public string RoleName { get; set; }
        public string RoleDepartment { get; set; }
        public string? RoleDescription { get; set; }
        public string RoleLocation { get; set; }
        public Role(string RoleName,string RoleDepartment,string RoleLocation)
        {
            this.RoleName=RoleName;
            this.RoleDepartment=RoleDepartment;
            this.RoleLocation=RoleLocation;
        }
    }
}
