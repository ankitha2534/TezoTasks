using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface IRoleOperations
    {
        public void AddRole(DBLayer.DBLayer.Role role);
        public List<DBLayer.DBLayer.Role> GetRoles();
    }
}
