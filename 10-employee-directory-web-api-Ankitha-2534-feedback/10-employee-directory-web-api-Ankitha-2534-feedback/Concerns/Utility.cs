namespace Concerns
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
