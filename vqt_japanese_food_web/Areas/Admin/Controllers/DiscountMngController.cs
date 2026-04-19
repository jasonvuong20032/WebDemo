using AutoMapper;
using JapaneseFood.Common.Enums;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Discount;
using JapaneseFood.Model.Discount;
using JapaneseFood.Model.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using static JapaneseFood.Common.Enums.EnumCommons;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class DiscountMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DiscountMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Discounts.Where(w => !w.IsDelete).Select(s => new DiscountDto()
            {
                Id = s.Id,
                Name = s.Name,
                Type = s.Type,
                TypeName = (s.Type == (int)DiscountTypeEnum.Percentage ? "Percen" : "Fixed"),
                Value = s.Value,
                IsActive = s.IsActive,
                IsDelete = s.IsDelete,
                CreatedAt = DateTime.Now,
                CreatedBy = s.CreatedBy,
            }).OrderBy(o => o.CreatedAt).ToListAsync();
            return View(model);
        }

        public ActionResult New()
        {
            var model = new DiscountDto();
            Set_Data_DropdownType(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(DiscountDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_DropdownType(ref model);
                return View(model);
            }
            var usersEntities = _mapper.Map<DiscountDto, DiscountEntities>(model);
            _context.Discounts.Add(usersEntities);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Create successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_DropdownType(ref model);
                TempData["IntervalServer"] = "Create failed";
            }
            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Discounts.Where(w => w.Id == Id).FirstOrDefaultAsync();
            if (entity == null)
            {
                return View(new DiscountDto());
            }
            var model = _mapper.Map<DiscountEntities, DiscountDto>(entity);
            Set_Data_DropdownType(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(DiscountDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_DropdownType(ref model);
                return View(model);
            }
            var entity = await _context.Discounts.Where(w => w.Id == model.Id).FirstOrDefaultAsync();
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
                Set_Data_DropdownType(ref model);
                TempData["IntervalServer"] = "Update failed";
            }
            return View(model);
        }

        public async Task<ActionResult> Destroy(long Id)
        {
            var entity = await _context.Discounts.Where(w => w.Id == Id).FirstOrDefaultAsync();
            if (entity != null)
            {
                entity.IsDelete = true;
                var result = await _context.SaveChangesAsync() > 0;
            }
            return RedirectToAction("Index");
        }

        private void Set_Data_DropdownType(ref DiscountDto model)
        {
            model.ListTypes = new List<SelectListItem>
            {
                new SelectListItem
                {
                    Value = ((int)DiscountTypeEnum.Percentage).ToString(),
                    Text = "Percent"
                },
                new SelectListItem
                {
                    Value = ((int)DiscountTypeEnum.FixedAmount).ToString(),
                    Text = "Fixed Amount"
                }
            };
        }
    }
}