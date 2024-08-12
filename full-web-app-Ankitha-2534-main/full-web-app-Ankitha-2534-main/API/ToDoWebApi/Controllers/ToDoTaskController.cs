using BusinessLogicLayer.Contracts;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ToDoWebApi.Models;

namespace ToDoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ToDoTaskController : BaseController
    {
        private readonly IToDoTaskService _taskService;
        private readonly ILogger _logger;

        public ToDoTaskController(IToDoTaskService taskService,ILogger<ToDoTaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }


        [HttpGet("userId")]

        public ApiDataResponse<List<UserTask>> GetTasks()
        {
           
            try
            {
                int userId = GetCurrentUserId();
                _logger.LogInformation("Retrieving tasks at {currenttime} by {user} ", DateTime.UtcNow.ToLongTimeString(),userId);
                var tasks = _taskService.GetTasks(userId);
                return new ApiDataResponse<List<UserTask>> { Data = tasks.Data, IsSuccess = true, Message = "All Tasks" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed while retrieving tasks");
                return new ApiDataResponse<List<UserTask>> { Data = null, IsSuccess = false, Message = "No task found" };
            }
        }

        [HttpGet("ActiveTasks")]
        public ActionResult<ApiDataResponse<List<UserTask>>> ActiveTasks()
        {
            try
            {
                int userId = GetCurrentUserId();
                var tasks = _taskService.ActiveTasks(userId);
                return new ApiDataResponse<List<UserTask>> { Data = tasks.Data, IsSuccess = true, Message = "Active Tasks" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed while retrieving Active tasks");
                return new ApiDataResponse<List<UserTask>> { Data = null, IsSuccess = false, Message = "No active tasks" };
            }
        }

        [HttpGet("CompletedTasks")]
        public ApiDataResponse<List<UserTask>> CompletedTasks()
        {
            try
            {
                int userId = GetCurrentUserId();
                var tasks = _taskService.CompletedTasks(userId);
                return new ApiDataResponse<List<UserTask>> { Data = tasks.Data, IsSuccess = true, Message = "Completed Tasks" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed while retrieving Completed tasks");
                return new ApiDataResponse<List<UserTask>> { Data = null, IsSuccess = false, Message = "No completed tasks" };
            }
        }

        [HttpPost]
        public ApiResponse AddTask(TaskDTO taskDTO)
        {
            try
            {
                int userId = GetCurrentUserId();
                taskDTO.UserId = userId;
                if(taskDTO.TaskDescription != null && taskDTO.TaskTitle!=null)
                {
                    _taskService.AddTask(taskDTO);
                    return new ApiResponse { IsSuccess = true, Message = "Task Added successfully" };
                }
                return new ApiResponse { IsSuccess = false, Message = "Not added successfully" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "Not added successfully" };
            }
        }


        [HttpPatch("Status/{taskId}")]
        public ApiResponse UpdateTaskStatus(int taskId)
        {
            try
            {
                _taskService.UpdateTaskStatus(taskId);
                return new ApiResponse { IsSuccess = true, Message = "Task status updated successfully" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "In-correct task-id" }; ;
            }
        }


        [HttpPut("UpdateTaskDetails/{taskId}")]

        public ApiResponse UpdateTask(TaskDTO taskDTO, int taskId)
        {
            try
            {
                _taskService.UpdateTask(taskDTO, taskId);
                return new ApiResponse { IsSuccess = true, Message = "Task updated successfully" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "In-correct task-id or task title is not unique" };
            }
        }

        [HttpDelete("{taskId}")]

        public ApiResponse DeleteTask(int taskId)
        {
            try
            {
                _taskService.DeleteTask(taskId);
                return new ApiResponse { IsSuccess = true, Message = "Task deleted successfully." };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "Failed to delete the task" };
            }
        }

        [HttpDelete("Tasks")]
        public ApiResponse Delete()
        {
            try
            {
                int userId = GetCurrentUserId();
                _taskService.Delete(userId);
                return new ApiResponse { IsSuccess = true, Message = "All tasks deleted successfully" };
            }
            catch (Exception ex)
            {
                return new ApiResponse { IsSuccess = false, Message = "Failed to delete tasks" };
            }
        }
    }
}
