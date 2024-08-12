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
    public class DataMapper : IDataMapper
    {
        public UserDetail MapUserViewToModel(UserDTO users)
        {
            UserDetail user = new UserDetail()
            {
                UserName = users.UserName,
                Password = users.Password
            };
            return user;
        }

        public UserInfo MapUserModelToView(UserDetail userDetail)
        {
            UserInfo user = new UserInfo()
            {
                UserId = userDetail.UserId,
                UserName = userDetail.UserName,
                Password = userDetail.Password
            };
            return user;
        }


        public UserTask MapTaskViewToModel(TaskDTO taskDTO)
        {
            UserTask task = new UserTask()
            {
                TaskTitle = taskDTO.TaskTitle,
                TaskDescription = taskDTO.TaskDescription,
                UserId = taskDTO.UserId,
                TaskDate = DateTime.Now
            };
            return task;
        }
    }
}
