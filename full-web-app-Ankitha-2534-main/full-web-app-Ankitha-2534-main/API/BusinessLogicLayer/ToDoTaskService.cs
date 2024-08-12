using BusinessLogicLayer.Contracts;
using BusinessLogicLayer.Models;
using DataAccessLayer.Contracts;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace BusinessLogicLayer
{
    public class ToDoTaskService : IToDoTaskService
    {
        private readonly IToDoTaskRepository _taskRepository;
        public ToDoTaskService(IToDoTaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        //Get Method
        public BusinessDataResult<List<UserTask>> GetTasks(int userId)
        {
            if (userId <= 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "Invalid userId" };
            }
            var tasks = _taskRepository.GetTasks(userId);
            if (tasks == null || tasks.Count == 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "No tasks found for the specified user." };
            }
            return new BusinessDataResult<List<UserTask>> { Data = tasks, IsSuccess = true, Message = "Tasks retrieved successfully" };
        }

        //Add Method
        public BusinessResult AddTask(TaskDTO taskDTO)
        {
            if (taskDTO == null)
            {
                return new BusinessResult { IsSuccess = false, Message = "Task title should be unique and should not be null" };
            }
            bool existingTask = _taskRepository.GetTaskByTitle(taskDTO);
            if (existingTask != false)
            {
                return new BusinessResult { IsSuccess = false, Message = "A task with the same title already exists." };
            }
            else
            {
                _taskRepository.AddTask(taskDTO);
                return new BusinessResult { IsSuccess = true, Message = "Task details added successfully to the specified user" };
            }
        }

        //Update Method

        public BusinessResult UpdateTaskStatus(int taskId)
        {
            if (taskId <= 0)
            {
                return new BusinessResult { IsSuccess = false, Message = "Task Id don't exist" };
            }
            _taskRepository.UpdateTaskStatus(taskId);
            return new BusinessResult { IsSuccess = true, Message = "Updated task status successfully" };
        }

        public BusinessResult UpdateTask(TaskDTO taskDTO, int taskId)
        {
            if (taskId <= 0 || taskDTO == null)
            {
                return new BusinessResult { IsSuccess = false, Message = "Failed to update the data" };
            }
            bool existingTask = _taskRepository.GetTaskByTitle(taskDTO);
            if (existingTask != false)
            {
                return new BusinessResult { IsSuccess = false, Message = "A task with the same title already exists." };
            }
            _taskRepository.UpdateTask(taskDTO, taskId);
            return new BusinessResult { IsSuccess = true, Message = "Task details updated successfully to the specified user" };
        }

        public BusinessDataResult<List<UserTask>> ActiveTasks(int userId)
        {
            if (userId <= 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "Invalid user Id" };
            }
            var activeTasks = _taskRepository.ActiveTasks(userId);
            if (activeTasks.Count == 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "No active tasks" };
            }
            return new BusinessDataResult<List<UserTask>> { Data = activeTasks, IsSuccess = true, Message = "Active tasks retrieved successfully" };
        }

        public BusinessDataResult<List<UserTask>> CompletedTasks(int userId)
        {
            if (userId <= 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "Invalid user Id" };
            }
            var completedTasks = _taskRepository.CompletedTasks(userId);
            if (completedTasks.Count == 0)
            {
                return new BusinessDataResult<List<UserTask>> { Data = null, IsSuccess = false, Message = "No completed tasks" };
            }
            return new BusinessDataResult<List<UserTask>> { Data = completedTasks, IsSuccess = true, Message = "Completed tasks retrieved successfully" };
        }

        public BusinessResult DeleteTask(int taskId)
        {
            if (taskId <= 0)
            {
                return new BusinessResult { IsSuccess = false, Message = "The provided task ID is invalid for the specified user" };
            }
            bool isExistId = _taskRepository.GetTaskById(taskId);
            if (!isExistId)
            {
                return new BusinessResult { IsSuccess = false, Message = "The provided task ID does not exist for the specified user" };
            }
            _taskRepository.DeleteTask(taskId);
            return new BusinessResult { IsSuccess = true, Message = "Task deleted successfully" };
        }

        public BusinessResult Delete(int userId)
        {
            if (userId <= 0)
            {
                return new BusinessResult { IsSuccess = false, Message = "Invalid user Id" };
            }
            var tasks = _taskRepository.GetTasks(userId);
            if (tasks.Count == 0)
            {
                return new BusinessResult { IsSuccess = false, Message = "No tasks available for the specified user" };
            }
            _taskRepository.Delete(userId);
            return new BusinessResult { IsSuccess = true, Message = "Deleted all tasks successfully" };
        }
    }
}
