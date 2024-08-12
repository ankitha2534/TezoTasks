using ApplicationLayerEF;
using Interface;

namespace UserUtility
{
    public class DataConversionUtils : IDataConversion<Employee>
    {
        public DataLayerEF.DBModels.Employee MapData(Employee employee)
        {
            DataLayerEF.DBModels.Employee Dbmodel = new DataLayerEF.DBModels.Employee();
            Dbmodel.EmployeeId = employee.EmployeeId;
            Dbmodel.FirstName = employee.FirstName;
            Dbmodel.LastName = employee.LastName;
            Dbmodel.DateOfBirth = employee.DateOfBirth;
            Dbmodel.Email = employee.Email;
            Dbmodel.Phone = employee.Phone;
            Dbmodel.JoinDate = employee.JoinDate;
            Dbmodel.Location = employee.Location;
            Dbmodel.JobTitle = employee.JobTitle;
            Dbmodel.Department = employee.Department;
            Dbmodel.Manager = employee.Manager;
            Dbmodel.Project = employee.Project;
            return Dbmodel;
        }

        public List<Employee> MapDataDBtoList(List<DataLayerEF.DBModels.Employee> employee)
        {
            List<Employee> list = new List<Employee>();
            Employee emp = new Employee(null, null, null, null, null, null, null, null, null);
            for (int i = 0; i < employee.Count; i++)
            {
                //Employee emp = new Employee();
                emp.EmployeeId = employee[i].EmployeeId;
                emp.FirstName = employee[i].FirstName;
                emp.LastName = employee[i].LastName;
                emp.DateOfBirth = employee[i].DateOfBirth;
                emp.Email = employee[i].Email;
                emp.Phone = employee[i].Phone;
                emp.JoinDate = employee[i].JoinDate;
                emp.Location = employee[i].Location;
                emp.JobTitle = employee[i].JobTitle;
                emp.Department = employee[i].Department;
                emp.Manager = employee[i].Manager;
                emp.Project = employee[i].Project;
                list.Add(emp);
            }
            return list;
        }

        //Roles

        public DataLayerEF.DBModels.Role MapDataRole(Role role)
        {
            DataLayerEF.DBModels.Role Dbmodel = new DataLayerEF.DBModels.Role();
            Dbmodel.RoleName = role.RoleName;
            Dbmodel.RoleDepartment = role.RoleDepartment;
            Dbmodel.RoleDescription = role.RoleDescription;
            Dbmodel.RoleLocation = role.RoleLocation;
            return Dbmodel;
        }

        public List<Role> MapDBtoList(List<DataLayerEF.DBModels.Role> roleData)
        {
            List<Role> list = new List<Role>();
            Role role = new Role(null, null, null);
            for (int i = 0; i < roleData.Count; i++)
            {
                //Employee emp = new Employee();
                role.RoleName = roleData[i].RoleName;
                role.RoleDepartment = roleData[i].RoleDepartment;
                role.RoleDescription = roleData[i].RoleDescription;
                role.RoleLocation = roleData[i].RoleLocation;
                list.Add(role);
            }
            return list;
        }

    }
}
