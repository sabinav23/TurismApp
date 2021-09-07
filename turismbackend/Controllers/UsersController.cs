using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using turismbackend.Models;

namespace turismbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly turismContext _context;


        public UsersController(turismContext context)
        {
            _context = context;
        }

        // GET: api/Locations
        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<User>> GetUser()
        {
            var username = HttpContext.User.Identity.Name;

            var user = _context.Users
                .Where(x => x.UserName == username)
                .Include(user => user.MyLocations)
                .ThenInclude(l => l.Images.Where(i => i.IsPresentationImage == true))
                .FirstOrDefault();
            return user;
        }
    }
}
