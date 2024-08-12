using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace DataAccessLayer.Contracts
{
    public interface IToDoTaskRepository
    {
        public List<UserTask> GetTasks(int userId);
        public bool GetTaskByTitle(TaskDTO taskDTO);
        public bool GetTaskById(int taskId);
        public void AddTask(TaskDTO taskDTO);
        public void UpdateTaskStatus(int taskId);
        public void UpdateTask(TaskDTO taskDTO, int taskId);
        public List<UserTask> ActiveTasks(int userId);
        public List<UserTask> CompletedTasks(int userId);
        public void DeleteTask(int taskId);
        public void Delete(int userId);
    }
}
