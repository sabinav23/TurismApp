using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace turismbackend.Models
{
    public partial class FavoriteLocation
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int LocationId { get; set; }

        public virtual Location Location { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
