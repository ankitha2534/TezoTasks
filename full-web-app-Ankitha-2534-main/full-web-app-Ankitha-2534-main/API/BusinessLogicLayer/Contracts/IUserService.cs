using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLogicLayer.Models;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace BusinessLogicLayer.Contracts
{
    public interface IUserService
    {
        public BusinessDataResult<bool> CheckUserExistOrNot(UserDTO userDTO);
        public BusinessResult AddUser(UserDTO userDTO);
        public BusinessDataResult<List<UserDetail>> GetAllUsers();
        public BusinessDataResult<int> GetUserId(UserDTO userDTO);
        public BusinessDataResult<UserInfo>? GetUserByName(string userName);
    }
}
