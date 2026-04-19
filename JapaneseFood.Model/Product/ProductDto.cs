using JapaneseFood.Model.Image;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JapaneseFood.Model.Product
{
    public class ProductDto : BaseDto
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal? SalePrice { get; set; }
        public bool IsOnSale { get; set; }
        public int Quantity { get; set; }
        public string? Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Rating { get; set; }
        public int ReviewCount { get; set; }
        public bool IsAvailable { get; set; } = true;
        public int? DiscountId { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public List<ImageDto> Images { get; set; } = new List<ImageDto>();
        public ProductImageDto ProductImage { get; set; } = new ProductImageDto();
        public List<SelectListItem> Categories { get; set; } = new List<SelectListItem>();
        public List<SelectListItem> Discounts { get; set; } = new List<SelectListItem>();
    }
}
