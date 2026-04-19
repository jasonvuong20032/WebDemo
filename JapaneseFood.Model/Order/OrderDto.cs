using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Order
{
    public class OrderDto : BaseDto
    {
        public string Code { get; set; } = string.Empty;
        public long UserId { get; set; }
        public string? UserName { get; set; }
        public string? Address { get; set; }
        public string? FullName { get; set; }
        public string? Phone { get; set; }
        public int Quantity { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal TotalAmount { get; set; }
        public int Status { get; set; }
        public string? Note { get; set; }
        public int PaymentMethod { get; set; }
        public int PaymentStatus { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; } = new List<OrderDetailDto>();
    }
}
