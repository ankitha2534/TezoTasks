namespace ToDoWebApi.Models
{
    public class UpdateTaskStatusRequest
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }        
    }
}
