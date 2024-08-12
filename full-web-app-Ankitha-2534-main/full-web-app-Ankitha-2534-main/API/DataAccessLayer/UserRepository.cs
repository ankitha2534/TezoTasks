using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModelLayer.Models;
using DomainModelLayer.DomainModels;
using DataAccessLayer.Contracts;

namespace DataAccessLayer
{
    public class UserRepository : IUserRepository
    {
        private readonly ToDoListDbContext _toDoContext;
        private readonly IDataMapper _mapper;

        public UserRepository(ToDoListDbContext toDoContext, IDataMapper mapper)
        {
            _toDoContext = toDoContext;
            _mapper = mapper;
        }

        public bool CheckUserExistOrNot(UserDTO userDTO)
        {
            return _toDoContext.UserDetails.FirstOrDefault(user => user.UserName == userDTO.UserName && user.Password == userDTO.Password) != null;

        }
        public void AddUser(UserDTO userDTO)
        {

            var userModel = _mapper.MapUserViewToModel(userDTO);
            _toDoContext.UserDetails.Add(userModel);
            _toDoContext.SaveChanges();


        }

        public List<UserDetail> GetAllUsers()
        {
            var users = _toDoContext.UserDetails.ToList();
            return users;
        }

        public int GetUserId(UserDTO userDTO)
        {

            var user = _toDoContext.UserDetails.FirstOrDefault(users => users.UserName == userDTO.UserName && users.Password == userDTO.Password);
            int userId = 0;
            if (user != null)
            {
                userId = user.UserId;
            }
            return userId;

        }

        public UserInfo? GetUserByName(string userName)
        {
            var user = _toDoContext.UserDetails.FirstOrDefault(u => u.UserName == userName);
            if (user != null)
            {
                return _mapper.MapUserModelToView(user);
            }
            return null;
        }
    }
}
