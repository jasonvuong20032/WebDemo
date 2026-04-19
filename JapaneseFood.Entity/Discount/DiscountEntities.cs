using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Entity.Discount
{
    public class DiscountEntities : BaseEntities
    {
        public string Name { get; set; } = string.Empty;
        public int Type { get; set; }
        public decimal Value { get; set; }
    }
}
