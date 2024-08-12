namespace ToDoWebApi.Models
{
    public class ApiDataResponse<T> : ApiResponse
    {
        public T? Data { get; set; }
    }
}
