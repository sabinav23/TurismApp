using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace turismbackend.Models
{
    public partial class Location
    {
        public Location()
        {
            BookedLocations = new HashSet<BookedLocation>();
            Comments = new HashSet<Comment>();
            FavoriteLocations = new HashSet<FavoriteLocation>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string MainDescription { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string StreetName { get; set; }
        public int StreetNumber { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public decimal Price { get; set; }
        public bool IsAccomodation { get; set; }

        public int Capacity { get; set; }

        public double AverageStars { get; set; }

        public virtual ICollection<Image> Images { get; set; }

        public virtual ICollection<Amenity> Amenities { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<Booking> Bookings { get; set; }
    
        [JsonIgnore]
        public virtual ICollection<BookedLocation> BookedLocations { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<FavoriteLocation> FavoriteLocations { get; set; }
    }
}
