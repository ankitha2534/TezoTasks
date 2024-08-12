using DataLayerEF.DBModels;

namespace DataLayerEF
{
    public class EmployeeRepository
    {
        public void Add(Employee emp)
        {
            using (var context = new DBContextEF())
            {
                context.EmployeeTable.Add(emp);
                context.SaveChanges();
            }
        }

        public List<Employee> Get(string? empId)
        {
            if (string.IsNullOrEmpty(empId))
            {
                using (var context = new DBContextEF())
                { 
                    var data = context.EmployeeTable.ToList();
                    return data;
                }
            }
            else
            {
                using (var context = new DBContextEF())
                {
                    var data = context.EmployeeTable.Where(e => e.EmployeeId == empId).ToList();
                    return data;
                }
            }
        }
        public void Update(Employee emp)
        {
            using (var context = new DBContextEF())
            {
                context.EmployeeTable.Update(emp);
                context.SaveChanges();
            }
        }

        public void Delete(string empId)
        {
            using (var context = new DBContextEF())
            {
                var emp = context.EmployeeTable.SingleOrDefault(e => e.EmployeeId == empId);
                if (emp != null)
                {
                    context.EmployeeTable.Remove(emp);
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
