using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using DBLayer;
using Concerns;

namespace Services
{
    public class RoleOperations:IRoleOperations
    {
        RoleRepository roleRepository = new RoleRepository();
        //DataConversionUtils dataConvertion = new DataConversionUtils();
        //public void AddRole()
        //{
        //    string patternName = "^[a-zA-Z]+$";
        //    string roleName = Utility.GetInput("Please Enter Role Name");
        //    roleName = Validation(roleName, patternName, "Role Name");
        //    string department = Utility.GetInput("Please Enter Department");
        //    department = Validation(department, patternName, "Department");
        //    string description = Utility.GetInput("Please Enter Role Description");
        //    string location = Utility.GetInput("Please Enter Location");
        //    location = Validation(location, patternName, "Location");
        //    Role role = new Role(roleName, department, location);
        //    roledb.Add(MapDataRole(role));
        //    Console.WriteLine("Successfully Added");
        //}

        public void AddRole(DBLayer.DBLayer.Role role)
        {
            roleRepository.Add(role);
        }

        public List<DBLayer.DBLayer.Role> GetRoles()
        {
            return roleRepository.Get();
        }
        #region Helper validation     
        private string Validation(string text, string pattern, string content)
        {
            while (text == "" || !Regex.IsMatch(text, pattern))
            {
                Console.WriteLine("Please enter correct " + content + " : ");
                text = Console.ReadLine()!;
            }
            return text;
        }
        #endregion


        //public void DisplayRoleData()
        //{
        //    List<Role> displayAllRole = MapDBtoList(roledb.Get());
        //    for (int i = 0; i < displayAllRole.Count; i++)
        //    {
        //        Console.WriteLine("Role Name : " + displayAllRole[i].RoleName);
        //        Console.WriteLine("Department : " + displayAllRole[i].RoleDepartment);
        //        Console.WriteLine("Description : " + displayAllRole[i].RoleDescription);
        //        Console.WriteLine("Location : " + displayAllRole[i].RoleLocation);
        //        Console.WriteLine();
        //    }
        //    Console.WriteLine();
        //}

        //DataConversion

        //public DBLayer.DBLayer.Role MapDataRole(Role role)
        //{
        //    DBLayer.DBLayer.Role Dbmodel = new DBLayer.DBLayer.Role();
        //    Dbmodel.RoleName = role.RoleName;
        //    Dbmodel.Department = role.RoleDepartment;
        //    Dbmodel.Description = role.RoleDescription;
        //    Dbmodel.Location = role.RoleLocation;
        //    return Dbmodel;
        //}

        //public List<Role> MapDBtoList(List<DBLayer.DBLayer.Role> roleData)
        //{
        //    List<Role> list = new List<Role>();
        //    Role role = new Role(null, null, null);
        //    for (int i = 0; i < roleData.Count; i++)
        //    {
        //        //Employee emp = new Employee();
        //        role.RoleName = roleData[i].RoleName;
        //        role.RoleDepartment = roleData[i].Department;
        //        role.RoleDescription = roleData[i].Description;
        //        role.RoleLocation = roleData[i].Location;
        //        list.Add(role);
        //    }
        //    return list;
        //}
    }
}
