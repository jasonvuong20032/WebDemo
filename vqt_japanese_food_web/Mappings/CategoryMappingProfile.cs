using AutoMapper;
using JapaneseFood.Entity.Category;
using JapaneseFood.Model.Category;

namespace vqt_japanese_food_web.Mappings
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<CategoryDto, CategoryEntities>().ForMember(dest => dest.Catalog, opt => opt.Ignore()).ReverseMap();
        }
    }
}