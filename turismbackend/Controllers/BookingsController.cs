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
    public class BookingsController : Controller
    {
        private readonly turismContext _context;
        public BookingsController(turismContext context)
        {
            _context = context;
        }


        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Booking.FindAsync(id);
            _context.Booking.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var username = HttpContext.User.Identity.Name;
            var user = await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();

            var bookings = await _context.Booking.Where(b => b.User == user).Include(b => b.Location)
                .ThenInclude(l => l.Images.Where(i => i.IsPresentationImage == true)).ToListAsync();

            return bookings;
        }
    }
}
