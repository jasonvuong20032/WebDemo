using AutoMapper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Category;
using JapaneseFood.Model.Category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class CategoryMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public CategoryMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Categorys.Where(w => !w.IsDelete).Select(s => new CategoryDto()
            {
                Id = s.Id,
                Name = s.Name,
                CatalogId = s.CatalogId,
                CatalogName = s.Catalog.Name,
                IsActive = s.IsActive,
                IsDelete = s.IsDelete,
                CreatedAt = DateTime.Now,
                CreatedBy = s.CreatedBy,
            }).OrderBy(o => o.CreatedAt).ToListAsync();
            return View(model);
        }

        public ActionResult New()
        {
            var model = new CategoryDto();
            Set_Data_Dropdown(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(CategoryDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_Dropdown(ref model);
                return View(model);
            }
            var usersEntities = _mapper.Map<CategoryDto, CategoryEntities>(model);
            _context.Categorys.Add(usersEntities);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Create successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_Dropdown(ref model);
                TempData["IntervalServer"] = "Create failed";
            }
            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Categorys.Where(w => w.Id == Id).FirstOrDefaultAsync();
            if (entity == null)
            {
                return View(new CategoryDto());
            }
            var model = _mapper.Map<CategoryEntities, CategoryDto>(entity);
            Set_Data_Dropdown(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(CategoryDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_Dropdown(ref model);
                return View(model);
            }
            var entity = await _context.Categorys.Where(w => w.Id == model.Id).FirstOrDefaultAsync();
            if (entity != null)
            {
                entity.Id = model.Id;
                entity.Name = model.Name;
                entity.CatalogId = model.CatalogId;
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
                Set_Data_Dropdown(ref model);
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

        private void Set_Data_Dropdown(ref CategoryDto model)
        {
            var data = _context.Catalogs.Where(w => !w.IsDelete).ToList();
            if (data != null)
            {
                model.Catalogs = data.Select(x => new SelectListItem
                {
                    Value = x.Id.ToString(),
                    Text = x.Name
                }).ToList();
            }
        }
    }
}