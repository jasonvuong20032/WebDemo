using AutoMapper;
using JapaneseFood.Entity.User;
using JapaneseFood.Model.User;

namespace vqt_japanese_food_web.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<UserEntities, UserDto>().ReverseMap();
        }
    }
}
