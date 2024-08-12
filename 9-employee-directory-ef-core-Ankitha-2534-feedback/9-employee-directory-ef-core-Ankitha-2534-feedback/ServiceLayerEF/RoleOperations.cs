using System.Text.RegularExpressions;
using ApplicationLayerEF;
using DataLayerEF;
using UserUtility;

namespace ServiceLayerEF
{
    public class RoleOperations
    {
        RoleRepository roledb = new RoleRepository();
        DataConversionUtils dataConvertion = new DataConversionUtils();
        public void AddRole()
        {
            string patternName = "^[a-zA-Z]+$";
            string roleName = Utility.GetInput("Please Enter Role Name");
            roleName = Validation(roleName, patternName, "Role Name");
            string department = Utility.GetInput("Please Enter Department");
            department = Validation(department, patternName, "Department");
            string description = Utility.GetInput("Please Enter Role Description");
            string location = Utility.GetInput("Please Enter Location");
            location = Validation(location, patternName, "Location");
            Role role = new Role(roleName, department, location);
            roledb.Add(dataConvertion.MapDataRole(role));
            Console.WriteLine("Successfully Added");
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


        public void DisplayRoleData()
        {
            List<Role> displayAllRole = dataConvertion.MapDBtoList(roledb.Get());
            for (int i = 0; i < displayAllRole.Count; i++)
            {
                Console.WriteLine("Role Name : " + displayAllRole[i].RoleName);
                Console.WriteLine("Department : " + displayAllRole[i].RoleDepartment);
                Console.WriteLine("Description : " + displayAllRole[i].RoleDescription);
                Console.WriteLine("Location : " + displayAllRole[i].RoleLocation);
                Console.WriteLine();
            }
            Console.WriteLine();
        }
    }
}
