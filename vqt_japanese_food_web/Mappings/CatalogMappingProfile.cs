using AutoMapper;
using JapaneseFood.Entity.Article;
using JapaneseFood.Model.Catalog;

namespace vqt_japanese_food_web.Mappings
{
    public class CatalogMappingProfile : Profile
    {
        public CatalogMappingProfile()
        {
            CreateMap<CatalogEntities, CatalogDto>().ReverseMap();
        }
    }
}
