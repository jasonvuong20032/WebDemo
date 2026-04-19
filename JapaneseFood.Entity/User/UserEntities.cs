using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.User
{
    public class UserEntities : BaseEntities
    {
        public required string UserName { get; set; }
        public required string Password {  get; set; }
        public required string FullName { get; set; }
        public required string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Address { get; set; }
        public string? Avatar { get; set; }
        public int Gender { get; set; }
        public int RoleId { get; set; }
        public string? ActivationCode { get; set; }
    }
}
