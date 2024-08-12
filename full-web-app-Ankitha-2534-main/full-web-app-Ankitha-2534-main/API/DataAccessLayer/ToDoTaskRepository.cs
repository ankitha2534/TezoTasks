using DataAccessLayer.Contracts;
using DomainModelLayer.DomainModels;
using DomainModelLayer.Models;

namespace DataAccessLayer
{
    public class ToDoTaskRepository : IToDoTaskRepository
    {
        private readonly ToDoListDbContext _toDoContext;
        private readonly IDataMapper _mapper;
        public ToDoTaskRepository(ToDoListDbContext toDoContext, IDataMapper mapper)
        {

            _toDoContext = toDoContext;
            _mapper = mapper;

        }

        //Get Methods

        public List<UserTask> GetTasks(int userId)
        {
            List<UserTask> tasks = _toDoContext.UserTasks.Where(task => task.UserId == userId).ToList();
            return tasks;
        }

        public bool GetTaskByTitle(TaskDTO taskDTO)
        {
            return _toDoContext.UserTasks.SingleOrDefault(task => task.UserId == taskDTO.UserId && task.TaskTitle == taskDTO.TaskTitle)!=null;
        }

        public bool GetTaskById(int taskId)
        {
            return _toDoContext.UserTasks.FirstOrDefault(task => task.TaskId == taskId).TaskId>0;

        }

        //Add Methods

        public void AddTask(TaskDTO taskDTO)
        {

            var taskModel = _mapper.MapTaskViewToModel(taskDTO);
            _toDoContext.UserTasks.Add(taskModel);
            _toDoContext.SaveChanges();

        }

        //Update Methods

        public void UpdateTaskStatus(int taskId)
        {

            var taskStatus = _toDoContext.UserTasks.FirstOrDefault(user => user.TaskId == taskId);
            taskStatus.IsDone = !taskStatus.IsDone;
            _toDoContext.Update(taskStatus);
            _toDoContext.SaveChanges();

        }

        public void UpdateTask(TaskDTO taskDTO, int taskId)
        {

            var task = _toDoContext.UserTasks.FirstOrDefault(task => task.UserId == taskDTO.UserId && task.TaskId == taskId);
            if (task != null)
            {
                task.UserId = taskDTO.UserId;
                task.TaskId = taskId;
                task.TaskTitle = taskDTO.TaskTitle;
                task.TaskDescription = taskDTO.TaskDescription;
                _toDoContext.SaveChanges();
            }

        }

        public List<UserTask> ActiveTasks(int userId)
        {

            var activeTasks = _toDoContext.UserTasks.Where(task => task.UserId == userId && task.IsDone == false).ToList();
            return activeTasks;

        }

        public List<UserTask> CompletedTasks(int userId)
        {

            var completeTasks = _toDoContext.UserTasks.Where(task => task.UserId == userId && task.IsDone == true).ToList();
            return completeTasks;

        }

        public void DeleteTask(int taskId)
        {

            var tasksToRemove = _toDoContext.UserTasks.SingleOrDefault(task => task.TaskId == taskId);
            if (tasksToRemove != null)
            {
                _toDoContext.UserTasks.Remove(tasksToRemove);
                _toDoContext.SaveChanges();
            }

        }

        public void Delete(int userId)
        {

            var tasks = _toDoContext.UserTasks.Where(user => user.UserId == userId);
            if (tasks != null)
            {
                _toDoContext.UserTasks.RemoveRange(tasks);
                _toDoContext.SaveChanges();
            }

        }
    }
}
