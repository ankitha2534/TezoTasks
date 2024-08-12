using BusinessLogicLayer.Models;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace BusinessLogicLayer.Contracts
{
    public interface IToDoTaskService
    {
        public BusinessDataResult<List<UserTask>> GetTasks(int userId);
        public BusinessResult AddTask(TaskDTO taskDTO);
        public BusinessResult UpdateTaskStatus(int taskId);
        public BusinessResult UpdateTask(TaskDTO taskDTO, int taskId);
        public BusinessDataResult<List<UserTask>> ActiveTasks(int userId);
        public BusinessDataResult<List<UserTask>> CompletedTasks(int userId);
        public BusinessResult DeleteTask(int taskId);
        public BusinessResult Delete(int userId);
    }
}
