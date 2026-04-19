using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.User
{
    public class UserDto : BaseDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime BirthDate { get; set; } = DateTime.Now.AddDays(-1);
        public string? Address { get; set; }
        public string? Avatar { get; set; }
        public int Gender { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty; 
        public string? ActivationCode { get; set; }
        public List<SelectListItem> ListRoles { get; set; } = new List<SelectListItem>();

        [DataType(DataType.Upload)]
        public IFormFile? PictureUpload { get; set; }
    }
}
