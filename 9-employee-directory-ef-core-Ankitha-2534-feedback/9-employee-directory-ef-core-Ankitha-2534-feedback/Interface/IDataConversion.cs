namespace Interface
{
    public interface IDataConversion<T> where T : class
    {
        DataLayerEF.DBModels.Employee MapData(T data);
        List<T> MapDataDBtoList(List<DataLayerEF.DBModels.Employee> employee);
    }
}
