﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace turismbackend.Controllers.ViewModels
{
    public class RegisterViewModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsBusiness { get; set; }
        public int Age { get; set; }
        public string Username { get; set; }
    }
}
