using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace turismbackend.Controllers.ViewModels
{
    public class LocationViewModel
    {
        public IFormFile PresentationImage { get; set; }
        public List<IFormFile> AllImages { get; set; }

        public string City { get; set; }
        public string County { get; set; }

        public string Email { get; set; }

        public string MainDescription { get; set; }

        public string ShortDescription { get; set; }

        public string Title { get; set; }
         
        public string StreetName { get; set; }

        public string Phone { get; set; }

        public int StreetNumber { get; set; }

        public bool IsAccomodation { get; set; }

        public int Price { get; set; }

        public int Capacity { get; set; }

        public List<string> Amenities { get; set; }

    }
}
