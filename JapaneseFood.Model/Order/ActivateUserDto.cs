using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Order
{
    public class ActivateUserDto
    {
        public string UserName { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }
}
