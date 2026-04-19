using AutoMapper;
using JapaneseFood.Entity.Order;
using JapaneseFood.Model.Order;

namespace vqt_japanese_food_web.Mappings
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            CreateMap<OrderEntities, OrderDto>().ReverseMap();
        }
    }
}
