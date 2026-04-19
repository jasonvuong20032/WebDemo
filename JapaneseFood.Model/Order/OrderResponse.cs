using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Order
{
    public class OrderResponse
    {
        public bool Success { get; set; }
        public bool Failure { get; set; }
        public string Error { get; set; } = string.Empty;
        public int Type { get; set; }
        public string Key { get; set; } = string.Empty;
        public long Id { get; set; }
        public Dictionary<string, string> KeyValues { get; set; } = new Dictionary<string, string>();
    }
}
