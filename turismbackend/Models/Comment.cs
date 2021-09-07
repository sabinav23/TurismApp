using System;
using System.Collections.Generic;

#nullable disable

namespace turismbackend.Models
{
    public partial class Comment
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int LocationId { get; set; }
        public string Text { get; set; }

        public double Stars { get; set; }

        public virtual Location Location { get; set; }
        public virtual User User { get; set; }
    }
}
