using AutoMapper;
using JapaneseFood.Entity.Product;
using JapaneseFood.Model.Product;

namespace vqt_japanese_food_web.Mappings
{
    public class ProductMappingProfile : Profile
    {
        public ProductMappingProfile()
        {
            CreateMap<ProductDto, ProductEntities>().ForMember(dest => dest.Category, opt => opt.Ignore()).ReverseMap();
        }
    }
}
