using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace turismbackend.Models
{
    public partial class Image
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public byte[] Data { get; set; }

        public bool IsPresentationImage { get; set; }

        [JsonIgnore]
        public virtual Location Location { get; set; }
    }
}
