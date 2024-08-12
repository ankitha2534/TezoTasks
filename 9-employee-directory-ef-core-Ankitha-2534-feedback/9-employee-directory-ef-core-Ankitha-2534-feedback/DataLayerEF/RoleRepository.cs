using DataLayerEF.DBModels;

namespace DataLayerEF
{
    public class RoleRepository
    {
        string connectionString = "Server=10.0.0.27;Database=EmployeeAnkitha;Integrated Security=True";
        public void Add(Role role)
        {
            using (var context = new DBContextEF())
            {
                context.RoleTable.Add(role);
                context.SaveChanges();
            }
        }
        public List<DBModels.Role> Get()
        {
            using (var context = new DBContextEF())
            {
                var data = context.RoleTable.ToList();
                return data;
            }

        }

    }
}
