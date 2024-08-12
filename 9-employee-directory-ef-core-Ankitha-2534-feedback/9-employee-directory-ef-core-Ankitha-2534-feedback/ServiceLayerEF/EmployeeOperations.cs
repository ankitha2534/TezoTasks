using ApplicationLayerEF;
using DataLayerEF;
using UserUtility;

namespace ServiceLayerEF
{
    public class EmployeeOperations
    {
        EmployeeRepository employeedb = new EmployeeRepository();
        DataConversionUtils dataConvertion = new DataConversionUtils();

        Employee emp = new Employee("Id", "FirstName", "LastName", "Email", "Location", "JobTitle", "Department", "Manager", "Project");

        public void AddEmployee()
        {
            string employeeId = Utility.GetInput("Please Enter Employee Id(TZ0000) : ");
            employeeId = emp.ValidateEmployeeId(employeeId);
            string firstName = Utility.GetInput("Please Enter Employee FirstName : ");
            firstName = emp.ValidateText(firstName, "First Name");
            string lastName = Utility.GetInput("Please Enter Employee LastName : ");
            lastName = emp.ValidateText(lastName, "Last Name");
            string dateOfBirthString = Utility.GetInput("Please Enter Employee DateOfBirth : ");
            DateTime currentDate = DateTime.Now;
            DateTime dateOfBirth;
            bool isValidDate = DateTime.TryParse(dateOfBirthString, out dateOfBirth);
            if (!string.IsNullOrEmpty(dateOfBirthString))
            {
                if (!isValidDate || currentDate < dateOfBirth)
                {
                    dateOfBirth = emp.ValidateDate(isValidDate, dateOfBirth, currentDate);
                }
            }
            string email = Utility.GetInput("Please Enter Employee Email : ");
            email = emp.ValidateEmail(email);
            string phone = Utility.GetInput("Please Enter Employee Phone Number : ");
            if (!string.IsNullOrEmpty(phone))
            {
                phone = emp.ValidateMobileNumber(phone);
            }
            string joinDateString = Utility.GetInput("Please Enter Employee Join Date : ");
            DateTime joinDate;
            bool isValidJoinDate = DateTime.TryParse(joinDateString, out joinDate);
            if (!isValidJoinDate || dateOfBirth > joinDate)
            {
                joinDate = emp.ValidateJoinDate(isValidJoinDate, joinDate, dateOfBirth);
            }
            string location = Utility.GetInput("Please Enter Employee Location : ");
            location = emp.ValidateText(location, "Location");
            string jobTitle = Utility.GetInput("Please Enter Employee Job Title : ");
            jobTitle = emp.ValidateText(jobTitle, "Job Title");
            string department = Utility.GetInput("Please Enter Employee Department");
            department = emp.ValidateText(department, "Department");
            string manager = Utility.GetInput("Please Enter Employee Manager");
            if (!string.IsNullOrEmpty(manager))
            {
                manager = emp.ValidateText(manager, "Manager");
            }
            string project = Utility.GetInput("Please Enter Employee Project");
            if (!string.IsNullOrEmpty(project))
            {
                manager = emp.ValidateText(project, "Project");
            }
            Employee employee = new Employee(employeeId, firstName, lastName, email, location, jobTitle, department, manager, project) { EmployeeId = employeeId, FirstName = firstName, LastName = lastName, DateOfBirth = dateOfBirth, Email = email, Phone = phone, JoinDate = joinDate, Location = location, JobTitle = jobTitle, Department = department, Manager = manager, Project = manager };

            employeedb.Add(dataConvertion.MapData(employee));
            Console.WriteLine("Successfully Added");
            Console.WriteLine();
        }



        public void DisplayAll()
        {
            List<Employee> displayData = dataConvertion.MapDataDBtoList(employeedb.Get(null));
            for (int i = 0; i < displayData.Count; i++)
            {
                var currentEmployee = displayData[i];
                Console.WriteLine("EmpNo : " + currentEmployee.EmployeeId);
                Console.WriteLine("FullName : " + currentEmployee.FirstName + " " + currentEmployee.LastName);
                Console.WriteLine("JobTitle : " + currentEmployee.JobTitle);
                Console.WriteLine("Department : " + currentEmployee.Department);
                Console.WriteLine("Location : " + currentEmployee.Location);
                Console.WriteLine("JoinDate : " + currentEmployee.JoinDate);
                Console.WriteLine("Manager : " + currentEmployee.Manager);
                Console.WriteLine("Project : " + currentEmployee.Project);
                Console.WriteLine();
            }
        }

        public void DisplayEmployee()
        {
            // TODO Search DB based on Id
            string empNoSearch = Utility.GetInput("Please Enter Employee Id or enter 1 to go back : ");
            List<Employee> displayData = dataConvertion.MapDataDBtoList(employeedb.Get(empNoSearch));
            int employeeIndex = -1;
            if (displayData.Count == 0)
            {
                Console.WriteLine("No data found in the file.");
            }
            else
            {
                if (empNoSearch == "1")
                {
                    Console.WriteLine("You have been redirected to Employee Page");

                }
                for (int i = 0; i < displayData.Count; i++)
                {
                    if (empNoSearch.ToLower() == displayData[i].EmployeeId.ToLower())
                    {
                        employeeIndex = i;
                        break;
                    }
                }
                if (employeeIndex > -1)
                {
                    Console.WriteLine("EmpNo : " + displayData[employeeIndex].EmployeeId);
                    Console.WriteLine("FullName : " + displayData[employeeIndex].FirstName + " " + displayData[employeeIndex].LastName);
                    Console.WriteLine("JobTitle : " + displayData[employeeIndex].JobTitle);
                    Console.WriteLine("Department : " + displayData[employeeIndex].Department);
                    Console.WriteLine("Location : " + displayData[employeeIndex].Location);
                    Console.WriteLine("JoinDate : " + displayData[employeeIndex].JoinDate);
                    Console.WriteLine("Manager : " + displayData[employeeIndex].Manager);
                    Console.WriteLine("Project : " + displayData[employeeIndex].Project);
                    Console.WriteLine();
                }
                else if (empNoSearch != "1" && employeeIndex == -1)
                {
                    Console.WriteLine("Please Enter Valid Employee Id : ");
                }
            }
        }
        public void EditEmployee()
        {
            string empId = Utility.GetInput("Please Enter Employee Id: ");
            List<Employee> employees = new List<Employee>();
            employees = dataConvertion.MapDataDBtoList(employeedb.Get(empId));

            //Employee emp = new Employee();
            int validEmployee = 0;
            if (employees.Any())
            {
                // TODO Remove this logic related to empId=1

                while (validEmployee == 0)
                {
                    for (int i = 0; i < employees.Count; i++)
                    {
                        if (empId.ToLower() == employees[i].EmployeeId.ToLower())
                        {
                            int employeeIndex = i;

                            validEmployee = 1;
                            break;
                        }
                    }
                    if (validEmployee == 0)
                    {
                        Console.WriteLine("Please enter a valid employee id : ");
                        empId = Console.ReadLine()!;
                        Console.WriteLine();
                    }
                }

                var selectedEmployee = employees.SingleOrDefault();
                // TODO Go Through List operations
                // SingleOr default, First orDefault,Single,First,Count, Add,Delete,Add mutiple, Delete multiple, etc, 


                Console.WriteLine("FullName : " + selectedEmployee.FirstName + " " + selectedEmployee.LastName);
                Console.WriteLine("JobTitle : " + selectedEmployee.JobTitle);
                Console.WriteLine("Department : " + selectedEmployee.Department);
                Console.WriteLine("Location : " + selectedEmployee.Location);
                Console.WriteLine("JoinDate : " + selectedEmployee.JoinDate);
                Console.WriteLine("Manager : " + selectedEmployee.Manager);
                Console.WriteLine("Project : " + selectedEmployee.Project);
                DateTime currentDate = DateTime.Now;
                Console.WriteLine("Which of the following field you want to edit : ");
                Console.WriteLine("1.First Name\n2.Last Name\n3.Date Of Birth\n4.Email\n5.Phone Number\n6.Joining Date\n7.Location\n8.Job Title\n9.Department\n10.Manager\n11.Project\n12.Go Back\n");
                var chooseField = (EditFieldEnum)int.Parse(Console.ReadLine()!);
                switch (chooseField)
                {
                    case EditFieldEnum.firstName:
                        selectedEmployee.FirstName = Utility.GetInput("FirstName");
                        selectedEmployee.FirstName = emp.ValidateText(selectedEmployee.FirstName, "First Name");
                        break;
                    case EditFieldEnum.lastName:
                        selectedEmployee.LastName = Utility.GetInput("Last Name");
                        selectedEmployee.LastName = emp.ValidateText(selectedEmployee.LastName, "Last Name");
                        break;
                    case EditFieldEnum.dateOfBirth:
                        string dateOfBirthString = Utility.GetInput("Date Of Birth");
                        DateTime dateOfBirth;
                        bool isValidDate = DateTime.TryParse(dateOfBirthString, out dateOfBirth);
                        if (!string.IsNullOrEmpty(dateOfBirthString))
                        {
                            if (!isValidDate || currentDate < dateOfBirth)
                            {
                                dateOfBirth = emp.ValidateDate(isValidDate, dateOfBirth, currentDate);
                            }
                        }
                        selectedEmployee.DateOfBirth = dateOfBirth;
                        break;
                    case EditFieldEnum.email:
                        selectedEmployee.Email = Utility.GetInput("Email");
                        selectedEmployee.Email = emp.ValidateEmail(selectedEmployee.Email);
                        break;
                    case EditFieldEnum.phone:
                        selectedEmployee.Phone = Utility.GetInput("Phone Number");
                        if (!string.IsNullOrEmpty(selectedEmployee.Phone))
                        {
                            selectedEmployee.Phone = emp.ValidateMobileNumber(selectedEmployee.Phone);
                        }
                        break;
                    case EditFieldEnum.joinDate:
                        string joinDateString = Utility.GetInput("Joining Date");
                        DateTime joinDate;
                        bool isValidJoinDate = DateTime.TryParse(joinDateString, out joinDate);
                        if (!isValidJoinDate || selectedEmployee.DateOfBirth > joinDate)
                        {
                            joinDate = emp.ValidateJoinDate(isValidJoinDate, joinDate, selectedEmployee.DateOfBirth);
                        }
                        selectedEmployee.JoinDate = joinDate;
                        break;
                    case EditFieldEnum.location:
                        selectedEmployee.Location = Utility.GetInput("Location");
                        selectedEmployee.Location = emp.ValidateText(selectedEmployee.Location, "Location");
                        break;
                    case EditFieldEnum.jobTitle:
                        selectedEmployee.JobTitle = Utility.GetInput("Job Title");
                        selectedEmployee.JobTitle = emp.ValidateText(selectedEmployee.JobTitle, "Job Title");
                        break;
                    case EditFieldEnum.department:
                        selectedEmployee.Department = Utility.GetInput("Department");
                        selectedEmployee.Department = emp.ValidateText(selectedEmployee.Department, "Department");
                        break;
                    case EditFieldEnum.manager:
                        selectedEmployee.Manager = Utility.GetInput("Manager");
                        if (!string.IsNullOrEmpty(selectedEmployee.Manager))
                        {
                            selectedEmployee.Manager = emp.ValidateText(selectedEmployee.Manager, "Manager");
                        }
                        break;
                    case EditFieldEnum.project:
                        selectedEmployee.Project = Utility.GetInput("Project");
                        if (!string.IsNullOrEmpty(selectedEmployee.Project))
                        {
                            selectedEmployee.Project = emp.ValidateText(selectedEmployee.Project, "Project");
                        }
                        break;
                    case EditFieldEnum.goBack:
                        break;
                    default:
                        Console.WriteLine("Please choose right option...");
                        break;
                }
                employeedb.Update(dataConvertion.MapData(selectedEmployee));
            }
            else if (empId != "1")
            {
                Console.WriteLine("Please Enter Correct Employee Id : ");
            }

        }

        public void DeleteEmployee()
        {
            var empId = Utility.GetInput("Please Enter Employee Id or enter 1 to go back : ");

            employeedb.Delete(empId);
        }
    }
}
