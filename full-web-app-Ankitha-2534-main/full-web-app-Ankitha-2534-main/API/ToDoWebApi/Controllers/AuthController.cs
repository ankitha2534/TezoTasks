using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BusinessLogicLayer.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using ToDoWebApi.Models;

namespace ToDoWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public ActionResult Token(Models.LoginRequest request)
        {
            Models.LoginResponse response = new Models.LoginResponse() { IsSuccess = false, Message = "Invalid user/password" };
            //Validate 
            if (request == null)
            {
                return Ok(response);
            }
            if (string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password))
            {
                return Ok(response);
            }
            //Check with DB User and Password
            // Get User details/view by request.UserName
            var dbUser = _userService.GetUserByName(request.UserName);
            if (dbUser == null)
            {
                response.Message = "User doesn't exists";
                return Ok(response);
            }
            if (dbUser.Data.UserName != request.UserName || dbUser.Data.Password != request.Password)
            {
                response.Message = "User credentails are incorrect";
                return Ok(response);
            }

            string token = "";
            IdentityModelEventSource.ShowPII = true;
            JwtOptions jwtOptions = new JwtOptions
            {
                Issuer = "https://localhost:7060/",
                Audience = "https://localhost:7060/",
                SigningKey = "ShouldBe-LongerThan-16Char-SecretKey",
                ExpirationSeconds = 3600
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,request.UserName),
                new Claim(ClaimTypes.Name,dbUser.Data.UserId.ToString())
            };

            var jwtToken = new JwtSecurityToken(
                issuer: jwtOptions.Issuer,
                audience: jwtOptions.Audience,
                claims: claims,
                expires: DateTime.Now.AddSeconds(jwtOptions.ExpirationSeconds),
                signingCredentials: credentials
                );

            token = new JwtSecurityTokenHandler().WriteToken(jwtToken) ?? "error";
            response.Token = token;
            //If invlaid  return IsSuccess:false, message
            //Generate token , IsSuccess
            response.IsSuccess = true;
            response.Message = string.Empty;

            return Ok(response);

        }
    }
}
