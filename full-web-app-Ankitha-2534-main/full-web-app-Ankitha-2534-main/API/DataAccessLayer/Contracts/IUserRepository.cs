using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace DataAccessLayer.Contracts
{
    public interface IUserRepository
    {
        public bool CheckUserExistOrNot(UserDTO UserDTO);
        public void AddUser(UserDTO UserDTO);
        public List<UserDetail> GetAllUsers();
        public int GetUserId(UserDTO UserDTO);
        public UserInfo? GetUserByName(string userName);
    }
}
