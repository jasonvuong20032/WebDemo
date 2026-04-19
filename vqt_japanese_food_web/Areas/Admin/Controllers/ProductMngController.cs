using AutoMapper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Image;
using JapaneseFood.Entity.Product;
using JapaneseFood.Model.Category;
using JapaneseFood.Model.Image;
using JapaneseFood.Model.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class ProductMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Products
                .Where(w => !w.IsDelete)
                .Select(s => new ProductDto()
                {
                    Id = s.Id,
                    Code = s.Code,
                    Name = s.Name,
                    CategoryName = s.Category.Name,
                    IsActive = s.IsActive,
                    IsDelete = s.IsDelete,
                    CreatedAt = s.CreatedAt,
                    CreatedBy = s.CreatedBy,
                    UpdatedAt = s.UpdatedAt,
                    UpdatedBy = s.UpdatedBy
                }).OrderByDescending(o => o.CreatedAt).ToListAsync();

            return View(model);
        }

        public ActionResult New()
        {
            var model = new ProductDto();
            Set_Data_DropdownCategory(ref model);
            Set_Data_DropdownDiscount(ref model);
            model.Code = JapaneseFood.Common.CodeGeneratorExtension.GenerateProductCode();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(ProductDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_DropdownCategory(ref model);
                Set_Data_DropdownDiscount(ref model);
                return View(model);
            }

            var productEntities = _mapper.Map<ProductDto, ProductEntities>(model);
            _context.Products.Add(productEntities);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                TempData["Successful"] = "Product created successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_DropdownCategory(ref model);
                Set_Data_DropdownDiscount(ref model);
                TempData["IntervalServer"] = "Failed to create product";
            }

            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Products
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            var model = _mapper.Map<ProductEntities, ProductDto>(entity);

            var images = _context.Images
                .Where(w => w.ProductId == Id)
                .ToList();

            var imageMap = _mapper.Map<List<ImageEntities>, List<ImageDto>>(images);

            model.ProductImage.ProductId = Id;
            model.ProductImage.Images = imageMap;

            Set_Data_DropdownCategory(ref model);
            Set_Data_DropdownDiscount(ref model);

            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(ProductDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_DropdownCategory(ref model);
                Set_Data_DropdownDiscount(ref model);
                return View(model);
            }

            var entity = await _context.Products
                .Where(w => w.Id == model.Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.Id = model.Id;
                entity.Name = model.Name;
                entity.CategoryId = model.CategoryId;
                entity.Price = model.Price;
                entity.IsOnSale = model.IsOnSale;
                entity.SalePrice = model.SalePrice;
                entity.Quantity = model.Quantity;
                entity.Address = model.Address;
                entity.Latitude = model.Latitude;
                entity.Longitude = model.Longitude;
                entity.IsAvailable = model.IsAvailable;
                entity.DiscountId = model.DiscountId;
                entity.ShortDescription = model.ShortDescription;
                entity.Description = model.Description;
                entity.IsActive = model.IsActive;
                entity.UpdatedAt = DateTime.Now;
                entity.UpdatedBy = model.UpdatedBy;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                TempData["Successful"] = "Product updated successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_DropdownCategory(ref model);
                Set_Data_DropdownDiscount(ref model);
                TempData["IntervalServer"] = "Failed to update product";
            }

            return View(model);
        }

        public async Task<ActionResult> Destroy(long Id)
        {
            var entity = await _context.Products
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.IsDelete = true;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> CreatePicture(ProductImageDto model)
        {
            var _guid = Guid.NewGuid();
            if (model.PictureUpload != null)
            {
                model.ImageUrl = string.Format("~/Uploads/Product/{0}", _guid + Path.GetExtension(model.PictureUpload.FileName));
            }
            if (string.IsNullOrEmpty(model.ImageUrl))
            {
                model.ImageUrl = string.Format("~/Uploads/Product/{0}", "default-image_100.png");
            }
            var entity = new ImageEntities { ImageUrl = model.ImageUrl };
            entity.ProductId = model.ProductId;
            entity.Alt = model.Alt ?? string.Empty;
            entity.Title = model.Title ?? string.Empty;
            entity.SortOrder = model.SortOrder;

            _context.Images.Add(entity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result && model.PictureUpload != null)
            {
                string extensionName = Path.GetExtension(model.PictureUpload.FileName);
                string fileName = string.Format("{0}{1}", _guid.ToString(), extensionName);
                string path = Path.Combine(string.Format("{0}/{1}", "wwwroot/Uploads/Product", fileName));
                if (!Directory.Exists("wwwroot/Uploads/Product"))
                {
                    // Try to create the directory.
                    Directory.CreateDirectory("wwwroot/Uploads/Product");
                }
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await model.PictureUpload.CopyToAsync(stream);
                }
            }

            /*** GET LIST IMAGE FOR PRODUCT ***/
            var data = _context.Images
                .Where(w => w.ProductId == model.ProductId)
                .Select(s => new ImageDto()
            {
                Id = s.Id,
                ImageUrl = s.ImageUrl,
                Alt = s.Alt,
                Title = s.Title,
                SortOrder = s.SortOrder,
                ProductId = s.ProductId
            }).ToList();
            model.Images = data;

            return PartialView("_Images", model);
        }

        [HttpPost]
        public JsonResult QuickUpdate(long Id, int Sort)
        {
            var CurrentEntity = _context.Images.FirstOrDefault(f => f.Id == Id);
            if (CurrentEntity != null)
            {
                CurrentEntity.SortOrder = Sort;
            }
            var Result = _context.SaveChanges();
            if (Result >= 1)
            {
                return Json(new { ok = true });
            }
            else
            {
                return Json(new { ok = false });
            }
        }

        public async Task<ActionResult> DestroyImage(long Id)
        {
            var entity = await _context.Images.Where(w => w.Id == Id).FirstOrDefaultAsync();
            long _productId = 0;
            if (entity != null)
            {
                _productId = entity.ProductId;
                _context.Images.Remove(entity);
                await _context.SaveChangesAsync();
                try
                {
                    if (!string.IsNullOrEmpty(entity.ImageUrl))
                    {
                        entity.ImageUrl = entity.ImageUrl.Substring(1);
                    }
                    string path = Path.Combine(entity.ImageUrl);
                    using (FileStream stream = new FileStream(path, FileMode.Truncate, FileAccess.Write, FileShare.Delete, 4096, true))
                    {
                        await stream.FlushAsync();
                        System.IO.File.Delete(path);
                    }
                }
                catch (Exception ex)
                {
                }
            }
            return RedirectToAction("Edit", "ProductMng", new { Id = _productId });
        }

        private void Set_Data_DropdownCategory(ref ProductDto model)
        {
            var data = _context.Categorys.Where(w => !w.IsDelete).ToList();
            if (data != null)
            {
                model.Categories = data.Select(x => new SelectListItem
                {
                    Value = x.Id.ToString(),
                    Text = x.Name
                }).ToList();
            }
        }

        private void Set_Data_DropdownDiscount(ref ProductDto model)
        {
            var data = _context.Discounts.Where(w => !w.IsDelete).ToList();
            if (data != null)
            {
                model.Discounts = data.Select(x => new SelectListItem
                {
                    Value = x.Id.ToString(),
                    Text = x.Name
                }).ToList();
            }
        }
    }
}
