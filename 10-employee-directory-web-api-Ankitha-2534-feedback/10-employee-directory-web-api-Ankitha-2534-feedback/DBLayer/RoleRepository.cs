using DBLayer.DBLayer;
using System.Data.Entity.Infrastructure;

namespace DBLayer
{
    public class RoleRepository
    {
        public void Add(Role role)
        {
            using (var context = new DBContextEF())
            {
                context.Roles.Add(role);
                context.SaveChanges();
            }
        }
        public List<DBLayer.Role> Get()
        {
            using (var context = new DBContextEF())
            {
                var data = context.Roles.ToList();
                return data;
            }

        }
    }
}
