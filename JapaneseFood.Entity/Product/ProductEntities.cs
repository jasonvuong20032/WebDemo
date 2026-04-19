using JapaneseFood.Entity.Category;
using JapaneseFood.Entity.Image;
using System.ComponentModel.DataAnnotations.Schema;

namespace JapaneseFood.Entity.Product
{
    [Table("Products")]
    public class ProductEntities : BaseEntities
    {
        public long CategoryId { get; set; }       
        public required string Name { get; set; }
        public required string Code { get; set; }
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
        public bool IsAvailable { get; set; }
        public int? DiscountId { get; set; }
        public CategoryEntities Category { get; set; } = null!;
        public ICollection<ImageEntities> Images { get; set; }
            = new List<ImageEntities>();
    }
}
