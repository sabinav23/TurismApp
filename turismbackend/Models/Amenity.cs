using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace turismbackend.Models
{
    public class Amenity
    {
        public int Id { get; set; }

        public string Label { get; set; }

        public int LocationId { get; set; }

        [JsonIgnore]
        public virtual Location Location { get; set; }
    }
}
