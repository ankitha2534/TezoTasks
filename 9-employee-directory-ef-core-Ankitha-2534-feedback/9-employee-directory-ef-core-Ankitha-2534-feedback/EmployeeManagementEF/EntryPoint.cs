using ServiceLayerEF;
using UserUtility;

namespace EmployeeManagementEF
{
    public class EntryPoint
    {
        public static void Main(string[] args)
        {
            //    var applicationBuilder = Host.CreateApplicationBuilder();
            //    applicationBuilder.Services.AddDbContext<EntityFrameworkDBContext>();
            Console.WriteLine("Please choose an option from given below by entering value");
            Console.WriteLine("1.Employee Management\n2.Role Management\n3.Exit\n");
            string userInput = Console.ReadLine()!;
            EmployeeOperations employeeService = new EmployeeOperations();
            RoleOperations role = new RoleOperations();
            if (int.TryParse(userInput, out _))
            {
                while (userInput == "1" || userInput == "2")
                {
                    if (userInput == "1")
                    {
                        Console.WriteLine("Welcome to Employee Management");
                        Console.WriteLine("Please choose an option from given below by entering value");
                        Console.WriteLine("1.Add Employee\n2.Display all\n3.Display one\n4.Edit employee\n5.Delete employee\n6.Go Back\n");
                        var option = (ChooseFieldEmployeeEnum)int.Parse(Console.ReadLine()!);
                        switch (option)
                        {
                            case ChooseFieldEmployeeEnum.addDetails:
                                employeeService.AddEmployee();
                                break;
                            case ChooseFieldEmployeeEnum.displayAllEmp:
                                employeeService.DisplayAll();
                                break;
                            case ChooseFieldEmployeeEnum.displaySearch:
                                employeeService.DisplayEmployee();
                                break;
                            case ChooseFieldEmployeeEnum.editEmployee:
                                employeeService.EditEmployee();
                                break;
                            case ChooseFieldEmployeeEnum.removeEmployee:
                                employeeService.DeleteEmployee();
                                break;
                            case ChooseFieldEmployeeEnum.goBack:
                                userInput = "0";
                                break;
                            default:
                                Console.WriteLine("Please choose right option");
                                break;
                        }
                    }
                    else if (userInput == "2")
                    {
                        Console.WriteLine("Welcome to Role Management\n Please choose an option from given below by entering value");
                        Console.WriteLine("1.Add Role\n2.Display all\n3.Go Back\n");
                        var option = (ChooseFieldRoleEnum)int.Parse(Console.ReadLine()!);
                        switch (option)
                        {
                            case ChooseFieldRoleEnum.addRole:
                                role.AddRole();
                                break;
                            case ChooseFieldRoleEnum.roleData:
                                role.DisplayRoleData();
                                break;
                            case ChooseFieldRoleEnum.goBack:
                                userInput = "0";
                                break;
                            default:
                                Console.WriteLine("Please choose right option");
                                break;

                        }
                    }
                }
                if (userInput == "3")
                {
                    Console.WriteLine("You are exited");
                    Console.WriteLine("Press any key to exit");
                    Console.ReadKey();
                }
                if (int.Parse(userInput) >= 4 || userInput == "0")
                {
                    Console.WriteLine("Please choose correct option");
                    EntryPoint.Main(args);
                }
            }
            else
            {
                Console.WriteLine("Please enter a integer value");
                EntryPoint.Main(args);
            }
            return;
        }
    }
}
