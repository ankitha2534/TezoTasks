using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ToDoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserContextController : BaseController
    {
        [HttpGet]
        public ActionResult Get()
        {
            bool? isUserAuthenticated = this.User.Identity?.IsAuthenticated;
            int currentUserId = int.Parse(this.User.Identity.Name);
            string? currentLoggedInUserName = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return Ok(new { isUserAuthenticated, currentUserId, currentLoggedInUserName });
        }
    }
}
