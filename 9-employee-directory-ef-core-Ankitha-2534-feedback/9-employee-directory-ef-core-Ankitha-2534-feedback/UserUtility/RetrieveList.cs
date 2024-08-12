using DataLayerEF;
using Interface;

namespace UserUtility
{
    public class RetrieveList : IRetrieveList
    {
        public List<DataLayerEF.DBModels.Employee> EmployeeData()
        {
            List<DataLayerEF.DBModels.Employee> empData = new List<DataLayerEF.DBModels.Employee>();
            using (var context = new DBContextEF())
            {
                empData = context.EmployeeTable.ToList();
            }
            Console.WriteLine(empData.Count);
            return empData;
        }
    }
}
