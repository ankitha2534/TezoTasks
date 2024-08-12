namespace UserUtility
{
    public class Utility
    {
        public static string GetInput(string userInputMessage)
        {
            Console.WriteLine(userInputMessage);
            return Console.ReadLine()!;
        }
    }
}
