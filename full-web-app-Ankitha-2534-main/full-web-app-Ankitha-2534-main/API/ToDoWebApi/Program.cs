using System.Text;
using BusinessLogicLayer;
using BusinessLogicLayer.Contracts;
using DataAccessLayer;
using DataAccessLayer.Contracts;
using DomainModelLayer.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace ToDoWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Configuration.Sources.Clear();
            //To add Connection String
            builder.Configuration.AddJsonFile("todosettings.json", false);

            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddSwaggerGen(c =>
            {
                var securityScheme = new OpenApiSecurityScheme
                {
                    Name = "JWT Authentication",
                    Description = "Enter your JWT token in this field",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT"
                };

                c.AddSecurityDefinition("Bearer", securityScheme);

                var securityRequirement = new OpenApiSecurityRequirement
                                        {
                                            {
                                                new OpenApiSecurityScheme
                                                {
                                                    Reference = new OpenApiReference
                                                    {
                                                        Type = ReferenceType.SecurityScheme,
                                                        Id = "Bearer"
                                                    }
                                                },
                                                new string[] {}
                                            }
                                        };

                c.AddSecurityRequirement(securityRequirement);
            });
            builder.Services.AddCors(options => options.AddPolicy(name: "ALLOWALLOrigins",
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                          //To add specific origins
                          //policy.WithOrigins("http://example.com",
                          //                    "http://www.contoso.com");
                      }));

            Console.WriteLine("######################");
            Console.WriteLine(builder.Configuration.GetConnectionString("ConnectionStrings"));
            Console.WriteLine("######################");

            //Add conection string to the service provider
            builder.Services.AddDbContext<ToDoListDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStrings")));

            builder.Services.AddTransient<IUserService, UserService>();
            builder.Services.AddTransient<IToDoTaskService,ToDoTaskService>();
            builder.Services.AddTransient<IUserRepository,UserRepository>();
            builder.Services.AddTransient<IToDoTaskRepository,ToDoTaskRepository>();
            builder.Services.AddTransient<IDataMapper,DataMapper>();

            //Authentication and Authorization start

            builder.Services
                             .AddAuthentication(x =>
                             {
                                 x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                                 x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                             })
                             .AddJwtBearer(x =>
                             {
                                 x.RequireHttpsMetadata = false;
                                 x.SaveToken = true;
                                 x.TokenValidationParameters = new TokenValidationParameters
                                 {
                                     IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("ShouldBe-LongerThan-16Char-SecretKey")),
                                     ValidateIssuer = false,
                                     ValidateAudience = false
                                 };
                             });
            builder.Services.AddAuthorization();

            //Authentication and Authorization end


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            //if (app.Environment.IsDevelopment())
            //{
                app.UseSwagger();
                app.UseSwaggerUI();
            //}

            app.UseHttpsRedirection();
            app.UseCors("ALLOWALLOrigins");

            //app variable created

            app.UseAuthentication();
            app.UseAuthorization();

            //app variable creation end



            app.MapControllers();

            app.Run();
        }
    }
}
