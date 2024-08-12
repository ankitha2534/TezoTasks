
using Services;
using Microsoft.EntityFrameworkCore;

namespace WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<DBLayer.DBLayer.DBContextEF>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("MyDatabaseConnection")));
            builder.Services.AddTransient<IEmployeeOperations, EmployeeOperations>();
            builder.Services.AddTransient<IRoleOperations, RoleOperations>();
            //builder.Services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            //builder.Services.AddTransient<IRoleRepository, RoleRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
