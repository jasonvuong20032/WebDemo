using AutoMapper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Article;
using JapaneseFood.Model.Catalog;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CatalogMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CatalogMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Catalogs.Where(w => !w.IsDelete).Select(s => new CatalogDto()
            {
                Id = s.Id,
                Name = s.Name,
                IsActive = s.IsActive,
                IsDelete = s.IsDelete,
                CreatedAt = s.CreatedAt,
                CreatedBy = s.CreatedBy,
            }).OrderBy(o => o.CreatedAt).ToListAsync();
            return View(model);
        }

        public ActionResult New()
        {
            var model = new CatalogDto();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(CatalogDto model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var usersEntities = _mapper.Map<CatalogDto, CatalogEntities>(model);
            _context.Catalogs.Add(usersEntities);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Create successfully";
                return RedirectToAction("Index");
            }
            else
            {
                TempData["IntervalServer"] = "Create failed";
            }
            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Catalogs.Where(w => w.Id == Id).FirstOrDefaultAsync();
            if (entity == null)
            {
                return View(new CatalogDto());
            }
            var model = _mapper.Map<CatalogEntities, CatalogDto>(entity);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(CatalogDto model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var entity = await _context.Catalogs.Where(w => w.Id == model.Id).FirstOrDefaultAsync();
            if (entity != null)
            {
                entity.Id = model.Id;
                entity.Name = model.Name;
                entity.UpdatedAt = DateTime.Now;
                entity.UpdatedBy = model.UpdatedBy;
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Update successfully";
                return RedirectToAction("Index");
            }
            else
            {
                TempData["IntervalServer"] = "Update failed";
            }
            return View(model);
        }

        public async Task<ActionResult> Destroy(long Id)
        {
            var entity = await _context.Catalogs.Where(w => w.Id == Id).FirstOrDefaultAsync();
            if (entity != null)
            {
                entity.IsDelete = true;
                var result = await _context.SaveChangesAsync() > 0;
            }
            return RedirectToAction("Index");
        }
    }
}