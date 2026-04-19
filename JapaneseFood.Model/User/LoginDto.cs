using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.User
{
    public class LoginDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
