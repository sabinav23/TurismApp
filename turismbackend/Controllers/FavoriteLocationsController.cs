using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turismbackend.Controllers.ViewModels;
using turismbackend.Models;

namespace turismbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteLocationsController : ControllerBase
    {
        private readonly turismContext _context;

        public FavoriteLocationsController(turismContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteLocation>> GetFavoriteLocations(int id)
        {
            var username = HttpContext.User.Identity.Name;
            var user = _context.Users
                .FirstOrDefault(x => x.UserName == username);
            var favoriteLocations = await _context.FavoriteLocations.FirstOrDefaultAsync(i => i.LocationId == id && i.User == user);

            if (favoriteLocations == null)
            {
                return NotFound();
            }

            return favoriteLocations;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> FavoriteLocation(int id)
        {
            var username = HttpContext.User.Identity.Name;
            var user = _context.Users
                .FirstOrDefault(x => x.UserName == username);

            if (user == null)
            {
                return BadRequest();

            }

            var favoriteLocation = new FavoriteLocation()
            {
                User = user,
                LocationId = id
            };


            _context.FavoriteLocations.Add(favoriteLocation);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var favoriteLocation = await _context.FavoriteLocations.FirstOrDefaultAsync(f => f.LocationId == id);
            if (favoriteLocation == null)
            {
                return NotFound();
            }

            _context.FavoriteLocations.Remove(favoriteLocation);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
