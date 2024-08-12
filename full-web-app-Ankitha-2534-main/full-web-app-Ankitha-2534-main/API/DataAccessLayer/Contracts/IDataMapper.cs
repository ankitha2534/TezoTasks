using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace DataAccessLayer.Contracts
{
    public interface IDataMapper
    {
        public UserDetail MapUserViewToModel(UserDTO users);
        public UserInfo MapUserModelToView(UserDetail userDetail);
        public UserTask MapTaskViewToModel(TaskDTO taskDTO);
    }
}
