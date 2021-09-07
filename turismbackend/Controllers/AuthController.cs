using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using turismbackend.Controllers.ViewModels;
using turismbackend.Models;

namespace turismbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly turismContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthController(turismContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterViewModel registerViewModel)
        {
            User user = new User()
            {
                Email = registerViewModel.Email,
                EmailConfirmed = true,
                FirstName = registerViewModel.FirstName,
                LastName = registerViewModel.LastName,
                Age = registerViewModel.Age,
                IsBusiness = registerViewModel.IsBusiness,
                UserName = registerViewModel.Username
            };

            var result = await _userManager.CreateAsync(user, registerViewModel.Password);

            if (result.Succeeded)
            {
                return Ok(new { Result = "Register Success" });
            }
            return BadRequest(new { Error = result.Errors});
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginViewModel loginViewModel)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserName == loginViewModel.Username);
            if (user == null)
            {
                return BadRequest(new { Error = "Login failed" });
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, loginViewModel.Password, false);

            if (!signInResult.Succeeded)
            {
                return BadRequest(new { Error = "Login failed" });

            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("LONG_SAFE_STRING");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, loginViewModel.Username)
                }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString, IsBusiness = user.IsBusiness });
        }
    }
}
