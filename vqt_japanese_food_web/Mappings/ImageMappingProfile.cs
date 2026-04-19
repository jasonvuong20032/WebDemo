using AutoMapper;
using JapaneseFood.Entity.Image;
using JapaneseFood.Model.Image;

namespace vqt_japanese_food_web.Mappings
{
    public class ImageMappingProfile : Profile
    {
        public ImageMappingProfile()
        {
            CreateMap<ImageEntities, ImageDto>().ReverseMap();
        }
    }
}
