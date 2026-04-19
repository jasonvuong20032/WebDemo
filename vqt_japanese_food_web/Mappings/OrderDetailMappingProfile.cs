using AutoMapper;
using JapaneseFood.Entity.Order;
using JapaneseFood.Model.Order;

namespace vqt_japanese_food_web.Mappings
{
    public class OrderDetailMappingProfile : Profile
    {
        public OrderDetailMappingProfile()
        {
            CreateMap<OrderDetailDto, OrderDetailEntities>().ReverseMap();
        }
    }
}
