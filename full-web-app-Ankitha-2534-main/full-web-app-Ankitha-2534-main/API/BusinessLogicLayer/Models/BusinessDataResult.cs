namespace BusinessLogicLayer.Models
{
    public class BusinessDataResult<T> : BusinessResult
    {
        public T? Data { get; set; }
    }
}
