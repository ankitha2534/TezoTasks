using System.Text.RegularExpressions;
using Concerns;
using DBLayer;

namespace Services
{
    public class EmployeeOperations: IEmployeeOperations
    {
        //EmployeeRepository employeedb = new EmployeeRepository();
        //DataConversionUtils dataConvertion = new DataConversionUtils();

        //Employee emp = new Employee("Id", "FirstName", "LastName", "Email", "Location", "JobTitle", "Department", "Manager", "Project");

        //public void AddEmployee()
        //{
        //    string employeeId = Utility.GetInput("Please Enter Employee Id(TZ0000) : ");
        //    employeeId = ValidateEmployeeId(employeeId);
        //    string firstName = Utility.GetInput("Please Enter Employee FirstName : ");
        //    firstName = ValidateText(firstName, "First Name");
        //    string lastName = Utility.GetInput("Please Enter Employee LastName : ");
        //    lastName = ValidateText(lastName, "Last Name");
        //    string dateOfBirthString = Utility.GetInput("Please Enter Employee DateOfBirth : ");
        //    DateTime currentDate = DateTime.Now;
        //    DateTime dateOfBirth;
        //    bool isValidDate = DateTime.TryParse(dateOfBirthString, out dateOfBirth);
        //    if (!string.IsNullOrEmpty(dateOfBirthString))
        //    {
        //        if (!isValidDate || currentDate < dateOfBirth)
        //        {
        //            dateOfBirth = ValidateDate(isValidDate, dateOfBirth, currentDate);
        //        }
        //    }
        //    string email = Utility.GetInput("Please Enter Employee Email : ");
        //    email = ValidateEmail(email);
        //    string phone = Utility.GetInput("Please Enter Employee Phone Number : ");
        //    if (!string.IsNullOrEmpty(phone))
        //    {
        //        phone = ValidateMobileNumber(phone);
        //    }
        //    string joinDateString = Utility.GetInput("Please Enter Employee Join Date : ");
        //    DateTime joinDate;
        //    bool isValidJoinDate = DateTime.TryParse(joinDateString, out joinDate);
        //    if (!isValidJoinDate || dateOfBirth > joinDate)
        //    {
        //        joinDate = ValidateJoinDate(isValidJoinDate, joinDate, dateOfBirth);
        //    }
        //    string location = Utility.GetInput("Please Enter Employee Location : ");
        //    location = ValidateText(location, "Location");
        //    string jobTitle = Utility.GetInput("Please Enter Employee Job Title : ");
        //    jobTitle = ValidateText(jobTitle, "Job Title");
        //    string department = Utility.GetInput("Please Enter Employee Department");
        //    department = ValidateText(department, "Department");
        //    string manager = Utility.GetInput("Please Enter Employee Manager");
        //    if (!string.IsNullOrEmpty(manager))
        //    {
        //        manager = ValidateText(manager, "Manager");
        //    }
        //    string project = Utility.GetInput("Please Enter Employee Project");
        //    if (!string.IsNullOrEmpty(project))
        //    {
        //        manager = ValidateText(project, "Project");
        //    }
        //    Employee employee = new Employee(employeeId, firstName, lastName, email, location, jobTitle, department, manager, project) { EmployeeId = employeeId, FirstName = firstName, LastName = lastName, DateOfBirth = dateOfBirth, Email = email, Phone = phone, JoinDate = joinDate, Location = location, JobTitle = jobTitle, Department = department, Manager = manager, Project = manager };

        //    employeedb.Add(MapData(employee));
        //    Console.WriteLine("Successfully Added");
        //    Console.WriteLine();
        //}



        //public void DisplayAll()
        //{
        //    List<DBLayer.DBLayer.Employee> displayData = employeedb.Get(null);
        //    for (int i = 0; i < displayData.Count; i++)
        //    {
        //        var currentEmployee = displayData[i];
        //        Console.WriteLine("EmpNo : " + currentEmployee.EmployeeId);
        //        Console.WriteLine("FullName : " + currentEmployee.FirstName + " " + currentEmployee.LastName);
        //        Console.WriteLine("JobTitle : " + currentEmployee.JobTitle);
        //        Console.WriteLine("Department : " + currentEmployee.Department);
        //        Console.WriteLine("Location : " + currentEmployee.Location);
        //        Console.WriteLine("JoinDate : " + currentEmployee.JoinDate);
        //        Console.WriteLine("Manager : " + currentEmployee.Manager);
        //        Console.WriteLine("Project : " + currentEmployee.Project);
        //        Console.WriteLine();
        //    }
        //}

        //public void DisplayEmployee()
        //{
        //    // TODO Search DB based on Id
        //    string empNoSearch = Utility.GetInput("Please Enter Employee Id or enter 1 to go back : ");
        //    List<DBLayer.DBLayer.Employee> displayData = employeedb.Get(empNoSearch);
        //    int employeeIndex = -1;
        //    if (displayData.Count == 0)
        //    {
        //        Console.WriteLine("No data found in the file.");
        //    }
        //    else
        //    {
        //        if (empNoSearch == "1")
        //        {
        //            Console.WriteLine("You have been redirected to Employee Page");

        //        }
        //        for (int i = 0; i < displayData.Count; i++)
        //        {
        //            if (empNoSearch.ToLower() == displayData[i].EmployeeId.ToLower())
        //            {
        //                employeeIndex = i;
        //                break;
        //            }
        //        }
        //        if (employeeIndex > -1)
        //        {
        //            Console.WriteLine("EmpNo : " + displayData[employeeIndex].EmployeeId);
        //            Console.WriteLine("FullName : " + displayData[employeeIndex].FirstName + " " + displayData[employeeIndex].LastName);
        //            Console.WriteLine("JobTitle : " + displayData[employeeIndex].JobTitle);
        //            Console.WriteLine("Department : " + displayData[employeeIndex].Department);
        //            Console.WriteLine("Location : " + displayData[employeeIndex].Location);
        //            Console.WriteLine("JoinDate : " + displayData[employeeIndex].JoinDate);
        //            Console.WriteLine("Manager : " + displayData[employeeIndex].Manager);
        //            Console.WriteLine("Project : " + displayData[employeeIndex].Project);
        //            Console.WriteLine();
        //        }
        //        else if (empNoSearch != "1" && employeeIndex == -1)
        //        {
        //            Console.WriteLine("Please Enter Valid Employee Id : ");
        //        }
        //    }
        //}
        //public void EditEmployee()
        //{
        //    string empId = Utility.GetInput("Please Enter Employee Id: ");
        //    List<DBLayer.DBLayer.Employee> employees = new List<DBLayer.DBLayer.Employee>();
        //    employees = employeedb.Get(empId);

        //    //Employee emp = new Employee();
        //    int validEmployee = 0;
        //    if (employees.Any())
        //    {
        //        // TODO Remove this logic related to empId=1

        //        while (validEmployee == 0)
        //        {
        //            for (int i = 0; i < employees.Count; i++)
        //            {
        //                if (empId.ToLower() == employees[i].EmployeeId.ToLower())
        //                {
        //                    int employeeIndex = i;

        //                    validEmployee = 1;
        //                    break;
        //                }
        //            }
        //            if (validEmployee == 0)
        //            {
        //                Console.WriteLine("Please enter a valid employee id : ");
        //                empId = Console.ReadLine()!;
        //                Console.WriteLine();
        //            }
        //        }

        //        var selectedEmployee = employees.SingleOrDefault();
        //        // TODO Go Through List operations
        //        // SingleOr default, First orDefault,Single,First,Count, Add,Delete,Add mutiple, Delete multiple, etc, 


        //        Console.WriteLine("FullName : " + selectedEmployee.FirstName + " " + selectedEmployee.LastName);
        //        Console.WriteLine("JobTitle : " + selectedEmployee.JobTitle);
        //        Console.WriteLine("Department : " + selectedEmployee.Department);
        //        Console.WriteLine("Location : " + selectedEmployee.Location);
        //        Console.WriteLine("JoinDate : " + selectedEmployee.JoinDate);
        //        Console.WriteLine("Manager : " + selectedEmployee.Manager);
        //        Console.WriteLine("Project : " + selectedEmployee.Project);
        //        DateTime currentDate = DateTime.Now;
        //        Console.WriteLine("Which of the following field you want to edit : ");
        //        Console.WriteLine("1.First Name\n2.Last Name\n3.Date Of Birth\n4.Email\n5.Phone Number\n6.Joining Date\n7.Location\n8.Job Title\n9.Department\n10.Manager\n11.Project\n12.Go Back\n");
        //        var chooseField = (EditFieldEnum)int.Parse(Console.ReadLine()!);
        //        switch (chooseField)
        //        {
        //            case EditFieldEnum.firstName:
        //                selectedEmployee.FirstName = Utility.GetInput("FirstName");
        //                selectedEmployee.FirstName = ValidateText(selectedEmployee.FirstName, "First Name");
        //                break;
        //            case EditFieldEnum.lastName:
        //                selectedEmployee.LastName = Utility.GetInput("Last Name");
        //                selectedEmployee.LastName = ValidateText(selectedEmployee.LastName, "Last Name");
        //                break;
        //            case EditFieldEnum.dateOfBirth:
        //                string dateOfBirthString = Utility.GetInput("Date Of Birth");
        //                DateTime dateOfBirth;
        //                bool isValidDate = DateTime.TryParse(dateOfBirthString, out dateOfBirth);
        //                if (!string.IsNullOrEmpty(dateOfBirthString))
        //                {
        //                    if (!isValidDate || currentDate < dateOfBirth)
        //                    {
        //                        dateOfBirth = ValidateDate(isValidDate, dateOfBirth, currentDate);
        //                    }
        //                }
        //                selectedEmployee.DateOfBirth = dateOfBirth;
        //                break;
        //            case EditFieldEnum.email:
        //                selectedEmployee.Email = Utility.GetInput("Email");
        //                selectedEmployee.Email = ValidateEmail(selectedEmployee.Email);
        //                break;
        //            case EditFieldEnum.phone:
        //                selectedEmployee.Phone = Utility.GetInput("Phone Number");
        //                if (!string.IsNullOrEmpty(selectedEmployee.Phone))
        //                {
        //                    selectedEmployee.Phone = ValidateMobileNumber(selectedEmployee.Phone);
        //                }
        //                break;
        //            case EditFieldEnum.joinDate:
        //                string joinDateString = Utility.GetInput("Joining Date");
        //                DateTime joinDate;
        //                bool isValidJoinDate = DateTime.TryParse(joinDateString, out joinDate);
        //                if (!isValidJoinDate || selectedEmployee.DateOfBirth > joinDate)
        //                {
        //                    joinDate = ValidateJoinDate(isValidJoinDate, joinDate, selectedEmployee.DateOfBirth);
        //                }
        //                selectedEmployee.JoinDate = joinDate;
        //                break;
        //            case EditFieldEnum.location:
        //                selectedEmployee.Location = Utility.GetInput("Location");
        //                selectedEmployee.Location = ValidateText(selectedEmployee.Location, "Location");
        //                break;
        //            case EditFieldEnum.jobTitle:
        //                selectedEmployee.JobTitle = Utility.GetInput("Job Title");
        //                selectedEmployee.JobTitle = ValidateText(selectedEmployee.JobTitle, "Job Title");
        //                break;
        //            case EditFieldEnum.department:
        //                selectedEmployee.Department = Utility.GetInput("Department");
        //                selectedEmployee.Department = ValidateText(selectedEmployee.Department, "Department");
        //                break;
        //            case EditFieldEnum.manager:
        //                selectedEmployee.Manager = Utility.GetInput("Manager");
        //                if (!string.IsNullOrEmpty(selectedEmployee.Manager))
        //                {
        //                    selectedEmployee.Manager = ValidateText(selectedEmployee.Manager, "Manager");
        //                }
        //                break;
        //            case EditFieldEnum.project:
        //                selectedEmployee.Project = Utility.GetInput("Project");
        //                if (!string.IsNullOrEmpty(selectedEmployee.Project))
        //                {
        //                    selectedEmployee.Project = ValidateText(selectedEmployee.Project, "Project");
        //                }
        //                break;
        //            case EditFieldEnum.goBack:
        //                break;
        //            default:
        //                Console.WriteLine("Please choose right option...");
        //                break;
        //        }
        //        employeedb.Update(selectedEmployee);
        //    }
        //    else if (empId != "1")
        //    {
        //        Console.WriteLine("Please Enter Correct Employee Id : ");
        //    }

        //}

        //public void DeleteEmployee()
        //{
        //    var empId = Utility.GetInput("Please Enter Employee Id or enter 1 to go back : ");

        //    employeedb.Delete(empId);
        //}

        EmployeeRepository employeeRepository = new EmployeeRepository();

        public void AddEmployee(DBLayer.DBLayer.Employee emp)
        {
            employeeRepository.Add(emp);
        }
        public List<DBLayer.DBLayer.Employee> GetEmployee(string? empId)
        {
            return employeeRepository.Get(empId);
        }
        public void UpdateEmployee(DBLayer.DBLayer.Employee emp) 
        { 
            employeeRepository.Update(emp);
        }
        public void DeleteEmployee(string empId)
        {
            employeeRepository.Delete(empId);
        }

        //Validations

        //public string ValidateEmployeeId(string userInput)
        //{
        //    string patternEmpNo = "^TZ\\d{4}$";
        //    List<DBLayer.DBLayer.Employee> employees = new List<DBLayer.DBLayer.Employee>();
        //    employees = employeedb.Get(null);
        //    bool isValidInput = false;
        //    if (employees.Count != 0)
        //    {
        //        while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternEmpNo) || !isValidInput)
        //        {
        //            isValidInput = true;
        //            for (int i = 0; i < employees.Count; i++)
        //            {
        //                if (userInput == employees[i].EmployeeId)
        //                {
        //                    isValidInput = false;
        //                    break;
        //                }
        //            }
        //            if (!isValidInput)
        //            {
        //                Console.WriteLine("Employee Id should be unique : ");
        //            }
        //            else if (!Regex.IsMatch(userInput, patternEmpNo))
        //            {
        //                isValidInput = false;
        //                Console.WriteLine("Please enter correct Employee Id : ");
        //            }
        //            if (isValidInput && Regex.IsMatch(userInput, patternEmpNo)) break;
        //            userInput = Console.ReadLine()!;
        //        }
        //    }

        //    else
        //    {
        //        while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternEmpNo))
        //        {
        //            Console.WriteLine("Please enter correct Employee Id  : ");
        //            userInput = Console.ReadLine()!;
        //        }
        //    }

        //    return userInput;
        //}

        //public string ValidateEmail(string userInput)
        //{
        //    string patternMail = "^[a-zA-Z0-9]+@[a-zA-Z]+\\.[a-zA-Z]+$";
        //    while (string.IsNullOrEmpty(userInput) || !Regex.IsMatch(userInput, patternMail))
        //    {
        //        Console.WriteLine($"Please enter correct Employee Email : ");
        //        userInput = Console.ReadLine()!;
        //    }
        //    return userInput;
        //}
        //public string ValidateText(string userInput, string field)
        //{
        //    string patternName = "^(?! )[A-Za-z ]+$";
        //    while (userInput == string.Empty || !Regex.IsMatch(userInput, patternName))
        //    {
        //        Console.WriteLine($"Please enter correct {field} : ");
        //        userInput = Console.ReadLine()!;
        //    }
        //    return userInput;
        //}
        //public string ValidateMobileNumber(string userInput)
        //{
        //    if (!string.IsNullOrEmpty(userInput))
        //    {
        //        while (userInput.Length != 10)
        //        {
        //            Console.WriteLine("Phone Number should contain atleast 10 digits : ");
        //            userInput = Console.ReadLine()!;
        //        }
        //    }
        //    return userInput;
        //}
        //public DateTime ValidateDate(bool isValidDate, DateTime date, DateTime currentDate)
        //{
        //    while (!isValidDate || currentDate < date)
        //    {
        //        if (currentDate < date)
        //        {
        //            Console.WriteLine("Date of Birth Should be prior to current date");

        //        }
        //        else
        //        {
        //            Console.WriteLine($"Please enter correct Date Of Birth : ");
        //        }
        //        string dateString = Console.ReadLine()!;
        //        isValidDate = DateTime.TryParse(dateString, out date);
        //        if (string.IsNullOrEmpty(dateString))
        //        {
        //            break;
        //        }

        //    }
        //    return date;
        //}
        //public DateTime ValidateJoinDate(bool isValidDate, DateTime date, DateTime? currentDate)
        //{
        //    while (!isValidDate || currentDate > date)
        //    {
        //        if (currentDate > date)
        //        {
        //            Console.WriteLine("The join date should follow the date of birth");

        //        }
        //        else
        //        {
        //            Console.WriteLine($"Please enter correct Join Date : ");
        //        }
        //        string dateString = Console.ReadLine()!;
        //        isValidDate = DateTime.TryParse(dateString, out date);

        //    }
        //    return date;
        //}

        ////DataConvertions


        //public DBLayer.DBLayer.Employee MapData(Employee employee)
        //{
        //    DBLayer.DBLayer.Employee Dbmodel = new DBLayer.DBLayer.Employee();
        //    Dbmodel.EmployeeId = employee.EmployeeId;
        //    Dbmodel.FirstName = employee.FirstName;
        //    Dbmodel.LastName = employee.LastName;
        //    Dbmodel.DateOfBirth = employee.DateOfBirth;
        //    Dbmodel.Email = employee.Email;
        //    Dbmodel.Phone = employee.Phone;
        //    Dbmodel.JoinDate = employee.JoinDate;
        //    Dbmodel.Location = employee.Location;
        //    Dbmodel.JobTitle = employee.JobTitle;
        //    Dbmodel.Department = employee.Department;
        //    Dbmodel.Manager = employee.Manager;
        //    Dbmodel.Project = employee.Project;
        //    return Dbmodel;
        //}

        //public List<Employee> MapDataDBtoList(List<DBLayer.DBLayer.Employee> employee)
        //{
        //    List<Employee> list = new List<Employee>();
        //    Employee emp = new Employee(null, null, null, null, null, null, null, null, null);
        //    for (int i = 0; i < employee.Count; i++)
        //    {
        //        //Employee emp = new Employee();
        //        emp.EmployeeId = employee[i].EmployeeId;
        //        emp.FirstName = employee[i].FirstName;
        //        emp.LastName = employee[i].LastName;
        //        emp.DateOfBirth = employee[i].DateOfBirth;
        //        emp.Email = employee[i].Email;
        //        emp.Phone = employee[i].Phone;
        //        emp.JoinDate = employee[i].JoinDate;
        //        emp.Location = employee[i].Location;
        //        emp.JobTitle = employee[i].JobTitle;
        //        emp.Department = employee[i].Department;
        //        emp.Manager = employee[i].Manager;
        //        emp.Project = employee[i].Project;
        //        list.Add(emp);
        //    }
        //    return list;
        //}
    }
}
