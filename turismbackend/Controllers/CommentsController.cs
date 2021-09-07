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
    public class CommentsController : ControllerBase
    {
        private readonly turismContext _context;

        public CommentsController(turismContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments(int id)
        {
            var comments = await _context.Comments.Include(c => c.User).Where(i => i.LocationId == id).ToListAsync();

            if (comments == null)
            {
                return NotFound();
            }

            return comments;
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> AddComment(int id, CommentViewModel commentViewModel)
        {
            var username = HttpContext.User.Identity.Name;
            var user = _context.Users
                .FirstOrDefault(x => x.UserName == username);

            if (user == null)
            {
                return BadRequest();

            }

            var comment = new Comment()
            {
                User = user,
                LocationId = id,
                Text = commentViewModel.Text,
                Stars = commentViewModel.Stars
            };


            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var newStarsAverage = await _context.Comments.Where(i => i.LocationId == id).AverageAsync(c => c.Stars);

            var location = await _context.Locations.FindAsync(id);

            location.AverageStars = newStarsAverage;

            _context.Locations.Update(location);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
