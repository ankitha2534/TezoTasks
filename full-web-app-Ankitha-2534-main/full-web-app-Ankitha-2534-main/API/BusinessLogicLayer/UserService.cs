using BusinessLogicLayer.Contracts;
using BusinessLogicLayer.Models;
using DataAccessLayer.Contracts;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace BusinessLogicLayer
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public BusinessDataResult<bool> CheckUserExistOrNot(UserDTO userDTO)
        {
            if (userDTO == null)
            {
                return new BusinessDataResult<bool> { Data = false, IsSuccess = false, Message = "User details should not be null" };
            }
            bool userExist = _userRepository.CheckUserExistOrNot(userDTO);
            if (userExist == false)
            {
                return new BusinessDataResult<bool> { Data = false, IsSuccess = false, Message = "User doesnot exist" };
            }
            return new BusinessDataResult<bool> { Data = true, IsSuccess = true, Message = "User found" };
        }

        public BusinessResult AddUser(UserDTO userDTO)
        {
            if (userDTO == null)
            {
                return new BusinessResult { IsSuccess = false, Message = "User Name and password should not be null!" };
            }
            var isUserExist = _userRepository.GetUserByName(userDTO.UserName);
            if (isUserExist != null)
            {
                return new BusinessResult { IsSuccess = false, Message = "User Name already exists" };
            }
            _userRepository.AddUser(userDTO);
            return new BusinessResult { IsSuccess = true, Message = "Successfully added" };
        }

        public BusinessDataResult<List<UserDetail>> GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            if (users.Count == 0)
            {
                return new BusinessDataResult<List<UserDetail>> { Data = null, IsSuccess = false, Message = "No user exist" };
            }
            return new BusinessDataResult<List<UserDetail>> { Data = users, IsSuccess = true, Message = "Successfully retrieved all users" };

        }

        public BusinessDataResult<int> GetUserId(UserDTO userDTO)
        {
            if (userDTO != null)
            {
                return new BusinessDataResult<int> { Data = 0, IsSuccess = false, Message = "Username and password should not be null." };
            }
            var userId = _userRepository.GetUserId(userDTO);
            if (userId == 0)
            {
                return new BusinessDataResult<int> { Data = 0, IsSuccess = false, Message = "User do not exist with specified details" };
            }
            return new BusinessDataResult<int> { Data = userId, IsSuccess = true, Message = "User exists for given user details" };
        }

        public BusinessDataResult<UserInfo>? GetUserByName(string userName)
        {
            if (userName == null)
            {
                return new BusinessDataResult<UserInfo> { Data = null, IsSuccess = false, Message = "UserName should not be null" };
            }
            var user = _userRepository.GetUserByName(userName);
            return new BusinessDataResult<UserInfo> { Data = user, IsSuccess = true, Message = "User found with given details" };
        }
    }
}
