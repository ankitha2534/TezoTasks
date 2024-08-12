using Microsoft.AspNetCore.Mvc;
using Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagementAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        private readonly IRoleOperations _roleService;
        public RoleController(IRoleOperations roleService)
        {
            _roleService = roleService;
        }
        [HttpGet]
        public List<DBLayer.DBLayer.Role> GetRole()
        {
            return _roleService.GetRoles();
        }

        [HttpPost]
        public void AddRoles(DBLayer.DBLayer.Role role)
        {
            _roleService.AddRole(role);
        }
    }
}
