using System.Text.RegularExpressions;
using Interface;

namespace ApplicationLayerEF
{
    public class Employee
    {
        public string EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string? Phone { get; set; }
        public DateTime JoinDate { get; set; }
        public string Location { get; set; }
        public string JobTitle { get; set; }
        public string Department { get; set; }
        public string Manager { get; set; }
        public string Project { get; set; }

        public Employee(string EmployeeId, string FirstName, string LastName, string Email, string Location,string JobTitle,string Department, string Manager, string Project)
        {
            this.EmployeeId = EmployeeId;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.Email = Email;
            this.Location = Location;
            this.JobTitle = JobTitle;   
            this.Department = Department;
            this.Manager = Manager;
            this.Project = Project;
        }

        private readonly IRetrieveList retrieveData;
        public Employee(IRetrieveList retrieveData)
        {
            this.retrieveData = retrieveData;
        }

        private readonly IDataConversion<Employee> dataConversion;

        public Employee(IDataConversion<Employee> dataConversion)
        {
            this.dataConversion = dataConversion;
        }
        public string ValidateEmployeeId(string userInput)
        {
            string patternEmpNo = "^TZ\\d{4}$";
            List<Employee> employees = new List<Employee>();
            Console.WriteLine(employees);
           
                employees = dataConversion.MapDataDBtoList(retrieveData.EmployeeData());
                Console.WriteLine(employees);
                //employees = EmployeeService.MapDataDBtoList(employeedb.DisplayData(userInput));
                // List<Employee> employees = fileService.RetrieveData<Employee>();
                bool isValidInput = false;
                if (employees.Count != 0)
                {
                    while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternEmpNo) || !isValidInput)
                    {
                        isValidInput = true;
                        for (int i = 0; i < employees.Count; i++)
                        {
                            if (userInput == employees[i].EmployeeId)
                            {
                                isValidInput = false;
                                break;
                            }
                        }
                        if (!isValidInput)
                        {
                            Console.WriteLine("Employee Id should be unique : ");
                        }
                        else if (!Regex.IsMatch(userInput, patternEmpNo))
                        {
                            isValidInput = false;
                            Console.WriteLine("Please enter correct Employee Id : ");
                        }
                        if (isValidInput && Regex.IsMatch(userInput, patternEmpNo)) break;
                        userInput = Console.ReadLine()!;
                    }
                }
            
            else
            {
                while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternEmpNo))
                {
                    Console.WriteLine("Please enter correct Employee Id  : ");
                    userInput = Console.ReadLine()!;
                }
            }

            return userInput;
        }

        public string ValidateEmail(string userInput)
        {
            string patternMail = "^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+$";
            while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternMail))
            {
                Console.WriteLine($"Please enter correct Employee Email : ");
                userInput = Console.ReadLine()!;
            }
            return userInput;
        }
        public string ValidateText(string userInput, string field)
        {
            string patternName = "^(?! )[A-Za-z ]+$";
            while (userInput == string.Empty || !Regex.IsMatch(userInput, patternName))
            {
                Console.WriteLine($"Please enter correct {field} : ");
                userInput = Console.ReadLine()!;
            }
            return userInput;
        }
        public string ValidateMobileNumber(string userInput)
        {
            if (!string.IsNullOrEmpty(userInput))
            {
                while (userInput.Length != 10)
                {
                    Console.WriteLine("Phone Number should contain atleast 10 digits : ");
                    userInput = Console.ReadLine()!;
                }
            }
            return userInput;
        }
        public DateTime ValidateDate(bool isValidDate, DateTime date, DateTime currentDate)
        {
            while (!isValidDate || currentDate < date)
            {
                if (currentDate < date)
                {
                    Console.WriteLine("Date of Birth Should be prior to current date");

                }
                else
                {
                    Console.WriteLine($"Please enter correct Date Of Birth : ");
                }
                string dateString = Console.ReadLine()!;
                isValidDate = DateTime.TryParse(dateString, out date);
                if (string.IsNullOrEmpty(dateString))
                {
                    break;
                }

            }
            return date;
        }
        public DateTime ValidateJoinDate(bool isValidDate, DateTime date, DateTime currentDate)
        {
            while (!isValidDate || currentDate > date)
            {
                if (currentDate > date)
                {
                    Console.WriteLine("The join date should follow the date of birth");

                }
                else
                {
                    Console.WriteLine($"Please enter correct Join Date : ");
                }
                string dateString = Console.ReadLine()!;
                isValidDate = DateTime.TryParse(dateString, out date);

            }
            return date;
        }
    }
}
