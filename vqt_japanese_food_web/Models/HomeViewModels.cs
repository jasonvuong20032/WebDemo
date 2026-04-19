using JapaneseFood.Model.Catalog;
using JapaneseFood.Model.Category;
using JapaneseFood.Model.Product;

namespace vqt_japanese_food_web.Models
{
    public class HomeViewModels : PagingViewModel
    {
        public long? CatalogId { get; set; }
        public string? CatalogName { get; set; }
        public long? CategoryId { get; set; }
        public List<string> Banners { get; set; } = new List<string>
        {
            "/images/banner1.jpg",
            "/images/banner2.jpg",
            "/images/banner3.jpg"
        };

        public List<CatalogDto> Catalogs { get; set; } = new List<CatalogDto>();
        public List<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
        public ProductSaleViewModel ProductSales { get; set; } = new ProductSaleViewModel();
        public List<ProductDto> ProductSearch { get; set; } = new List<ProductDto>();
        public List<CatalogViewModel> Products { get; set; } = new List<CatalogViewModel>();      
       
    }

    public class ProductSaleViewModel
    {
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }

    public class ProductNearViewModel
    {
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }

    public class ProductRateViewModel
    {
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }

    public class ProductFavoriteViewModel
    {
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }   

    public class CatalogViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public List<CategoryViewModel> Categories { get; set; } = new List<CategoryViewModel>();
    }
    public class CategoryViewModel : PagingViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }

    public class PagingViewModel
    {
        public string? Search { get; set; }
        public string? Sort { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public int TotalPages 
        { 
            get 
            {
                if (PageSize == 0) return 0;
                return (int)Math.Ceiling((double)TotalRecords / PageSize); 
            } 
        }
    }
}
