using AutoMapper;
using JapaneseFood.Common.Enums;
using JapaneseFood.Entity;
using JapaneseFood.Entity.Article;
using JapaneseFood.Entity.Order;
using JapaneseFood.Model.Catalog;
using JapaneseFood.Model.Order;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class OrderMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public OrderMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Orders
                .Where(w => !w.IsDelete)
                .Select(s => new OrderDto()
                {
                    Id = s.Id,
                    Code = s.Code,
                    FullName = s.FullName,
                    Phone = s.Phone,
                    UserName = s.UserName,
                    Address = s.Address,
                    IsActive = s.IsActive,
                    IsDelete = s.IsDelete,
                    CreatedAt = s.CreatedAt,
                    CreatedBy = s.CreatedBy,
                    UpdatedAt = s.UpdatedAt,
                    UpdatedBy = s.UpdatedBy
                }).OrderBy(o => o.CreatedAt).ToListAsync();

            return View(model);
        }

        public ActionResult New()
        {
            var model = new OrderDto();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(OrderDto model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var orderEntities = _mapper.Map<OrderDto, OrderEntities>(model);
            _context.Orders.Add(orderEntities);

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Order created successfully";
                return RedirectToAction("Index");
            }
            else
            {
                TempData["IntervalServer"] = "Failed to create order";
            }

            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Orders
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            var model = _mapper.Map<OrderEntities, OrderDto>(entity);
            if (model != null)
            {
                var details = await (from od in _context.OrderDetails
                                     join p in _context.Products on od.ProductId equals p.Id
                                     where od.OrderId == Id
                                     select new OrderDetailDto
                                     {
                                         ProductId = od.ProductId,
                                         ProductCode = p.Code,
                                         ProductName = p.Name,
                                         Price = p.Price,
                                         Quantity = od.Quantity
                                     }).ToListAsync();

                model.OrderDetails = details;
            }
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(OrderDto model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            var entity = await _context.Orders
                .Where(w => w.Id == model.Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.Id = model.Id;
                entity.Code = model.Code;
                entity.UserName = model.UserName;
                entity.FullName = model.FullName;
                entity.Phone = model.Phone;
                entity.Address = model.Address;
                entity.CreatedAt = model.CreatedAt;
                entity.CreatedBy = model.CreatedBy;
                entity.UpdatedAt = model.UpdatedAt;
                entity.UpdatedBy = model.UpdatedBy;
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                TempData["Successful"] = "Order updated successfully";
                return RedirectToAction("Index");
            }
            else
            {
                TempData["IntervalServer"] = "Failed to update order";
            }

            return View(model);
        }

        public async Task<ActionResult> Destroy(long Id)
        {
            var entity = await _context.Orders
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.IsDelete = true;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Approved(long Id)
        {
            var entity = await _context.Orders.FirstOrDefaultAsync(f => f.Id == Id);
            if (entity != null)
            {
                entity.Status = (int)EnumCommons.OrderStatus.Approved;
                entity.UpdatedBy = "1";

                var response = await _context.SaveChangesAsync() > 0;
                if (!response)
                {
                    TempData["ErrorMessage"] =
                        $"Failed to approve order {entity.Code}. Please contact the administrator.";
                }
                else
                {
                    TempData["SuccessMessage"] =
                        $"Order {entity.Code} has been approved successfully.";
                }
            }
            return RedirectToAction("Index");
        }

        public async Task<ActionResult> Rejected(long Id)
        {
            var entity = await _context.Orders.FirstOrDefaultAsync(f => f.Id == Id);
            if (entity != null)
            {
                entity.Status = (int)EnumCommons.OrderStatus.Cancelled;
                entity.UpdatedBy = "1";

                var response = await _context.SaveChangesAsync() > 0;
                if (!response)
                {
                    TempData["ErrorMessage"] =
                        $"Failed to cancel order {entity.Code}. Please contact the administrator.";
                }
                else
                {
                    TempData["SuccessMessage"] =
                        $"Order {entity.Code} has been cancelled successfully.";
                }
            }
            return RedirectToAction("Index");
        }
    }
}