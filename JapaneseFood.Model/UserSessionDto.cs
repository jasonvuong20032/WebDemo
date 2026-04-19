using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model
{
    public class UserSessionDto
    {
        public long Id { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? Avatar { get; set; }
        public int RoleId { get; set; }
        public bool RememberMe { get; set; }
    }
}
