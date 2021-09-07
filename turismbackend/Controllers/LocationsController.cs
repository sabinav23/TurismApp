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
    public class LocationsController : ControllerBase
    {
        private readonly turismContext _context;

        public LocationsController(turismContext context)
        {
            _context = context;
        }

        // GET: api/Locations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations([FromQuery] string county = null, [FromQuery] string startDate = null, [FromQuery] string endDate = null, [FromQuery] bool isAccomodation = false)
        {
            var query = _context.Locations.Where(l => l.IsAccomodation == isAccomodation);

            if (county != null)
            {
                query = query.Where(l => l.County.ToLower() == county.ToLower());
            }

            var locations = await query.Include(i => i.Images.Where(i => i.IsPresentationImage == true)).Include(l => l.Bookings).ToListAsync();

            if (startDate == null || endDate == null)
            {
                return locations;
            }

            var availableLocations = new List<Location>();

            var parsedStartDate = DateTime.Parse(startDate);
            var parsedEndDate = DateTime.Parse(endDate);

            foreach (var location in locations)
            {
                var availableCapacity = GetAvailableCapacity(location, location.Bookings.ToList(), parsedStartDate, parsedEndDate);

                if (availableCapacity > 0)
                {
                    availableLocations.Add(location);
                }
            }

            return availableLocations;
        }

        // GET: api/Locations/accomodation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocations(int id)
        {
            var location = await _context.Locations.Include(i => i.Images).Include(l => l.Amenities).FirstOrDefaultAsync(i => i.Id == id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }
        
        
        // PUT: api/Locations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(int id, [FromForm] LocationViewModel locationViewModel)
        {
            var location = await _context.Locations.FindAsync(id);

            location.Title = locationViewModel.Title;
            location.ShortDescription = locationViewModel.ShortDescription;
            location.County = locationViewModel.County;
            location.City = locationViewModel.City;
            location.StreetName = locationViewModel.StreetName;
            location.StreetNumber = locationViewModel.StreetNumber;
            location.Email = locationViewModel.Email;
            location.Phone = locationViewModel.Phone;
            location.Price = locationViewModel.Price;
            location.Capacity = locationViewModel.Capacity;

            var images = await _context.Image.Where(i => i.Location == location).ToListAsync();
            var amenities = await _context.Amenities.Where(a => a.Location == location).ToListAsync();
            _context.Image.RemoveRange(images);
            _context.Amenities.RemoveRange(amenities);
            await _context.SaveChangesAsync();

            this.SaveImage(locationViewModel.PresentationImage, location, true);

            if (locationViewModel.AllImages != null)
            {
                foreach (var file in locationViewModel.AllImages)
                {
                    SaveImage(file, location, false);
                }

            }

            if (locationViewModel.Amenities != null)
            {
                foreach (var label in locationViewModel.Amenities)
                {
                    var amenity = new Amenity
                    {
                        Label = label,
                        Location = location
                    };
                    _context.Amenities.Add(amenity);
                }
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Locations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> PostLocation([FromForm] LocationViewModel locationViewModel)
        {
            var username = HttpContext.User.Identity.Name;
            var user = _context.Users
                .FirstOrDefault(x => x.UserName == username);
            var location = new Location()
            {
                Title = locationViewModel.Title,
                ShortDescription = locationViewModel.ShortDescription,
                MainDescription = locationViewModel.MainDescription,
                County = locationViewModel.County,
                City = locationViewModel.City,
                StreetName = locationViewModel.StreetName,
                StreetNumber = locationViewModel.StreetNumber,
                Email = locationViewModel.Email,
                Phone = locationViewModel.Phone,
                Price = locationViewModel.Price,
                IsAccomodation = locationViewModel.IsAccomodation,
                Capacity = locationViewModel.Capacity,
                User = user
            };

            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            this.SaveImage(locationViewModel.PresentationImage, location, true);

            if (locationViewModel.AllImages != null)
            {
                foreach (var file in locationViewModel.AllImages)
                {
                    SaveImage(file, location, false);
                }

            }

            if (locationViewModel.Amenities != null)
            {
                foreach (var label in locationViewModel.Amenities)
                {
                    var amenity = new Amenity
                    {
                        Label = label,
                        Location = location
                    };
                    _context.Amenities.Add(amenity);
                }
            }
            await _context.SaveChangesAsync();


            return Ok();
        }

        private void SaveImage(IFormFile file, Location location, bool isPresentationImage) 
        {
            Image image = new Image
            {
                Title = file.FileName,
                IsPresentationImage = isPresentationImage,
                Location = location
            };

            MemoryStream ms = new MemoryStream();
            file.CopyTo(ms);
            image.Data = ms.ToArray();

            ms.Close();
            ms.Dispose();

            _context.Image.Add(image);
            _context.SaveChanges();
        }

        // DELETE: api/Locations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _context.Locations.FirstOrDefaultAsync(i => i.Id == id);
            var images = await _context.Image.Where(i => i.Location == location).ToListAsync();

            if (location == null)
            {
                return NotFound();
            }

            _context.Image.RemoveRange(images);
            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost("{id}/availability")]
        public async Task<ActionResult> CheckAvailability(int id, BookLocationViewModel bookLocationViewModel)
        {
            var location = await _context.Locations.FindAsync(id);
            var existingBookingInfos = await _context.Booking.Where(b => b.LocationId == id).ToListAsync();

            var startDate = DateTime.Parse(bookLocationViewModel.StartDate);
            var endDate = DateTime.Parse(bookLocationViewModel.EndDate);

            var availableCapacity = GetAvailableCapacity(location, existingBookingInfos, startDate, endDate);

            if (availableCapacity <= 0)
            {
                return BadRequest(new { Error = "Locatia este ocupata in zilele respective. Va rugam incercati cu alte date." });
            }

            return Ok();
        }

        // POST: api/Locations/{id}/Book
        [HttpPost("{id}/Book")]
        public async Task<ActionResult> BookLocation(int id, BookLocationViewModel bookLocationViewModel)
        {
            var username = HttpContext.User.Identity.Name;
            var user = _context.Users
                .FirstOrDefault(x => x.UserName == username);

            var location = await _context.Locations.FindAsync(id);
            var existingBookingInfos = await _context.Booking.Where(b => b.LocationId == id).ToListAsync();

            var startDate = DateTime.Parse(bookLocationViewModel.StartDate);
            var endDate = DateTime.Parse(bookLocationViewModel.EndDate);

            var availableCapacity = GetAvailableCapacity(location, existingBookingInfos, startDate, endDate);

            if (availableCapacity <= 0)
            {
                return BadRequest(new { Error = "Locatia este ocupata in zilele respective. Va rugam incercati cu alte date." });
            }

            var bookingInfo = new Booking()
            {
                FirstName = bookLocationViewModel.FirstName,
                LastName = bookLocationViewModel.LastName,
                Email = bookLocationViewModel.Email,
                StartDate = startDate,
                EndDate = endDate,
                PhoneNumber = bookLocationViewModel.PhoneNumber,
                Location = location,
                User = user
            };
            _context.Booking.Add(bookingInfo);

            var bookLocation = new BookedLocation()
            {
                Location = location,
                User = user
            };

            _context.BookedLocations.Add(bookLocation);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private int GetAvailableCapacity(Location location, List<Booking> existingBookingInfos, DateTime startDate, DateTime endDate)
        {
            var availableCapacity = location.Capacity;

            foreach (var booking in existingBookingInfos)
            {
                if ((booking.StartDate <= startDate && booking.EndDate >= startDate) ||
                    (booking.StartDate <= endDate && booking.EndDate >= endDate) ||
                    (booking.StartDate >= startDate && booking.StartDate <= endDate) ||
                    (booking.EndDate <= endDate && booking.EndDate >= startDate))
                {
                    availableCapacity--;
                }
            }
            return availableCapacity;
        }

        [HttpGet("favorites")]
        public async Task<ActionResult<IEnumerable<Location>>> GetFavoritedLocations()
        {
            var username = HttpContext.User.Identity.Name;
            var user = await _context.Users.Where(x => x.UserName == username).FirstOrDefaultAsync();

            var favoriteLocations = await _context.FavoriteLocations.Where(b => b.User == user).Include(b => b.Location)
                .ThenInclude(l => l.Images.Where(i => i.IsPresentationImage == true)).ToListAsync();

            var locations = favoriteLocations.Select(fL => fL.Location).ToList();

            return locations;
        }
    }
}
