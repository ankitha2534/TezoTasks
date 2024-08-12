using Microsoft.AspNetCore.Mvc;

namespace ToDoWebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        protected int GetCurrentUserId()
        {
            if (this.User.Identity!=null && this.User.Identity.IsAuthenticated)
            {
                int userId = int.Parse(this.User.Identity.Name);
                return userId;
            }
            return 0;
        }
    }
}
