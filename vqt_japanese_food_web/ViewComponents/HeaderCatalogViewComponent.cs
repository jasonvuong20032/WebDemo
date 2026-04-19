using JapaneseFood.Entity;
using JapaneseFood.Model.Catalog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace vqt_japanese_food_web.ViewComponents
{
    public class HeaderCatalogViewComponent : ViewComponent
    {
        private readonly DataContext _context;

        public HeaderCatalogViewComponent(DataContext context)
        {
            _context = context;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var catalogs = await _context.Catalogs
                .AsNoTracking()
                .Where(x => !x.IsDelete && x.IsActive)
                .OrderBy(x => x.CreatedAt)
                .Select(x => new CatalogDto
                {
                    Id = x.Id,
                    Name = x.Name
                })
                .ToListAsync();

            return View(catalogs);
        }
    }
}