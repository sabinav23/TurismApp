using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace turismbackend.Models
{
    public partial class User: IdentityUser
    {
        public User()
        {
             BookedLocations = new HashSet<BookedLocation>();
             Comments = new HashSet<Comment>();
             FavoriteLocations = new HashSet<FavoriteLocation>();
        }

        public int Age { get; set; }
        public bool IsBusiness { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<BookedLocation> BookedLocations { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<FavoriteLocation> FavoriteLocations { get; set; }

        public virtual ICollection<Location> MyLocations { get; set; }

        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
