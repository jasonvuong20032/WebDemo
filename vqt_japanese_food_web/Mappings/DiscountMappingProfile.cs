using AutoMapper;
using JapaneseFood.Entity.Discount;
using JapaneseFood.Model.Discount;

namespace vqt_japanese_food_web.Mappings
{
    public class DiscountMappingProfile : Profile
    {
        public DiscountMappingProfile()
        {
            CreateMap<DiscountEntities, DiscountDto>().ReverseMap();
        }
    }
}
