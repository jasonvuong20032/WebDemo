using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Discount
{
    public class DiscountDto : BaseDto
    {
        public string Name { get; set; } = string.Empty;
        public int Type { get; set; }
        public string TypeName { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public List<SelectListItem> ListTypes { get; set; } = new List<SelectListItem>();
    }
}
