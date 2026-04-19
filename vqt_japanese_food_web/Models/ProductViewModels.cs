using JapaneseFood.Model.Discount;
using JapaneseFood.Model.Product;

namespace vqt_japanese_food_web.Models
{
    public class ProductViewModels
    {
        public ProductDto Product { get; set; } = new ProductDto();
        public List<DiscountDto> Discounts { get; set; } = new List<DiscountDto>();
    }
}
