using DBLayer.DBLayer;


namespace DBLayer
{
    public class EmployeeRepository
    {
        public void Add(DBLayer.Employee emp)
        {
            using (var context = new DBContextEF())
            {
                context.Employees.Add(emp);
                context.SaveChanges();
            }
        }

        public List<DBLayer.Employee> Get(string? empId)
        {
            if (string.IsNullOrEmpty(empId))
            {
                using (var context = new DBContextEF())
                {
                    var data = context.Employees.ToList();
                    return data;
                }
            }
            else
            {
                using (var context = new DBContextEF())
                {
                    var data = context.Employees.Where(e => e.EmployeeId == empId).ToList();
                    return data;
                }
            }
        }
        public void Update(DBLayer.Employee emp)
        {
            using (var context = new DBContextEF())
            {
                context.Employees.Update(emp);
                context.SaveChanges();
            }
        }

        public void Delete(string empId)
        {
            using (var context = new DBContextEF())
            {
                var emp = context.Employees.SingleOrDefault(e => e.EmployeeId == empId);
                if (emp != null)
                {
                    context.Employees.Remove(emp);
                    context.SaveChanges();
                    Console.WriteLine("Employee deleted successfully");
                }
                else
                {
                    Console.WriteLine("No employee is found with the ID you provided.");
                }
            }
        }
    }
}
