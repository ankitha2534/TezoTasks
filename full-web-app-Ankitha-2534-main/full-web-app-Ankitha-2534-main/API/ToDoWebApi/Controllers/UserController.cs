using BusinessLogicLayer.Contracts;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;
using Microsoft.AspNetCore.Mvc;
using ToDoWebApi.Models;

namespace ToDoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet("Get User")]

        public ApiDataResponse<List<UserDetail>> GetUser()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return new ApiDataResponse<List<UserDetail>> { Data = users.Data, IsSuccess = true, Message = "Successfully retrieved all users" };
            }
            catch (Exception ex)
            {
                return new ApiDataResponse<List<UserDetail>> { Data = null, IsSuccess = false, Message = "No user found" };
            }
        }


        [HttpGet("UserExistOrNot")]

        public ApiResponse CheckUserExistOrNot(UserDTO userDTO)
        {
            try
            {
                bool userIsExist = _userService.CheckUserExistOrNot(userDTO).Data;
                return new ApiResponse { IsSuccess = true, Message = "Found user" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "User doesnot exist" };
            }
        }


        [HttpGet("Get UserId")]

        public ApiDataResponse<int> GetUserId(UserDTO userDTO)
        {
            try
            {
                var users = _userService.GetUserId(userDTO);
                return new ApiDataResponse<int> { Data = users.Data, IsSuccess = true, Message = "UserId Exist!" };
            }
            catch (Exception ex)
            {
                return new ApiDataResponse<int> { Data = 0, IsSuccess = false, Message = "UserId not Exist!" };
            }
        }


        [HttpPost("AddUser")]

        public ApiResponse AddUser(UserDTO userDTO)
        {
            try
            {
                var users = _userService.AddUser(userDTO);
                return new ApiResponse { IsSuccess = true, Message = "Added Successfully" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "Not added" };
            }
        }

    }
}
