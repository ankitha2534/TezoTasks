using Microsoft.EntityFrameworkCore;
using DataLayerEF.DBModels;

namespace DataLayerEF
{
    public class DBContextEF : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=10.0.0.27;Database=EmployeeAnkitha;Integrated Security=True;TrustServerCertificate=Yes;");
        }

        public DbSet<Employee> EmployeeTable { get; set; }
        public DbSet<Role> RoleTable { get; set; }
    }
}
