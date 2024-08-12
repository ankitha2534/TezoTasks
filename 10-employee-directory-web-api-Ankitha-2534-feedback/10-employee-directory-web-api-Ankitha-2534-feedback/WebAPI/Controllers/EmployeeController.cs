using Microsoft.AspNetCore.Mvc;
using Concerns;
using Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeOperations _employeeService;
        public EmployeeController(IEmployeeOperations employeeService)
        {
            _employeeService = employeeService;
        }
        // GET: api/<EmployeeController>
        [HttpGet]
        public List<DBLayer.DBLayer.Employee> GetEmployees(string? empId)
        {
            return _employeeService.GetEmployee(empId);
        }

        [HttpPost]
        public void AddEmp(DBLayer.DBLayer.Employee emp)
        {
            _employeeService.AddEmployee(emp);
        }

        [HttpPatch]
        public void UpdateEmp(DBLayer.DBLayer.Employee emp)
        {
            _employeeService.UpdateEmployee(emp);
        }

        [HttpDelete]
        public void Delete(string empId)
        {
            _employeeService.DeleteEmployee(empId);
        }

    }
}
