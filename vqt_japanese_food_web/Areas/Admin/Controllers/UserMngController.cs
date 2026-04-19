using AutoMapper;
using JapaneseFood.Entity;
using JapaneseFood.Entity.User;
using JapaneseFood.Model.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using static JapaneseFood.Common.Enums.EnumCommons;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class UserMngController : Controller
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserMngController(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<ActionResult> Index()
        {
            var model = await _context.Users
                .Where(w => !w.IsDelete)
                .Select(s => new UserDto()
                {
                    Id = s.Id,
                    FullName = s.FullName,
                    UserName = s.UserName,
                    PhoneNumber = s.PhoneNumber,
                    Password = s.Password,
                    Address = s.Address,
                    RoleId = s.RoleId,
                    Avatar = s.Avatar,
                    RoleName = s.RoleId == (int)ERoleType.Admin ? "Admin" : "Employee",
                    IsActive = s.IsActive,
                    IsDelete = s.IsDelete,
                    CreatedAt = s.CreatedAt,
                    CreatedBy = s.CreatedBy,
                    UpdatedAt = s.UpdatedAt,
                    UpdatedBy = s.UpdatedBy
                }).OrderBy(o => o.CreatedAt)
                .ToListAsync();

            return View(model);
        }

        public ActionResult New()
        {
            var model = new UserDto();
            Set_Data_DropdownRole(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> New(UserDto model)
        {
            if (!ModelState.IsValid)
            {
                Set_Data_DropdownRole(ref model);
                return View(model);
            }
            var exitsEmail = await _context.Users
                .AsNoTracking()
                .AnyAsync(x => x.UserName == model.UserName);

            if (exitsEmail)
            {
                ModelState.AddModelError("UserName", "UserName exits");
                Set_Data_DropdownRole(ref model);
                return View(model);
            }
            var _guid = Guid.NewGuid();
            if (model.PictureUpload != null)
            {
                model.Avatar = string.Format("~/Uploads/User/{0}", _guid + Path.GetExtension(model.PictureUpload.FileName));
            }
            if (string.IsNullOrEmpty(model.Avatar))
            {
                model.Avatar = string.Format("~/Uploads/User/{0}", "default-image_100.jpg");
            }
            var usersEntities = _mapper.Map<UserDto, UserEntities>(model);
            usersEntities.UserName = model.UserName;

            _context.Users.Add(usersEntities);
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                if (model.PictureUpload != null)
                {
                    string extensionName = Path.GetExtension(model.PictureUpload.FileName);
                    string fileName = string.Format("{0}{1}", _guid.ToString(), extensionName);
                    string path = Path.Combine(string.Format("{0}/{1}", "wwwroot/Uploads/User", fileName));
                    if (!Directory.Exists("wwwroot/Uploads/User"))
                    {
                        // Try to create the directory.
                        Directory.CreateDirectory("wwwroot/Uploads/User");
                    }
                    using (var stream = new FileStream(path, FileMode.Create)) 
                    {
                        await model.PictureUpload.CopyToAsync(stream);
                    }
                }                

                TempData["Successful"] = "Created successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_DropdownRole(ref model);
                TempData["IntervalServer"] = "Create failed";
            }

            return View(model);
        }

        public async Task<ActionResult> Edit(long Id)
        {
            var entity = await _context.Users
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            var model = _mapper.Map<UserEntities, UserDto>(entity);
            model.ConfirmPassword = model.Password;

            Set_Data_DropdownRole(ref model);
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Edit(UserDto model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("ConfirmPassword", "Password confirmation does not match");
            }

            if (!ModelState.IsValid)
            {
                Set_Data_DropdownRole(ref model);
                return View(model);
            }
            var _guid = Guid.NewGuid();
            if (model.PictureUpload != null)
            {
                model.Avatar = string.Format("~/Uploads/User/{0}", _guid + Path.GetExtension(model.PictureUpload.FileName));
            }
            if (string.IsNullOrEmpty(model.Avatar))
            {
                model.Avatar = string.Format("~/Uploads/User/{0}", "default-image_100.jpg");
            }
            var entity = await _context.Users
                .Where(w => w.Id == model.Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.Id = model.Id;
                entity.FullName = model.FullName;
                entity.UserName = model.UserName;
                entity.Password = model.Password;
                entity.PhoneNumber = model.PhoneNumber;
                entity.BirthDate = model.BirthDate;
                entity.Gender = model.Gender;
                entity.Avatar = model.Avatar;
                entity.Address = model.Address;
                entity.RoleId = model.RoleId;
                entity.CreatedAt = model.CreatedAt;
                entity.CreatedBy = model.CreatedBy;
                entity.UpdatedAt = model.UpdatedAt;
                entity.UpdatedBy = model.UpdatedBy;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                if (model.PictureUpload != null)
                {
                    string extensionName = Path.GetExtension(model.PictureUpload.FileName);
                    string fileName = string.Format("{0}{1}", _guid.ToString(), extensionName);
                    string path = Path.Combine(string.Format("{0}/{1}", "wwwroot/Uploads/User", fileName));
                    if (!Directory.Exists("wwwroot/Uploads/User"))
                    {
                        // Try to create the directory.
                        Directory.CreateDirectory("wwwroot/Uploads/User");
                    }
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await model.PictureUpload.CopyToAsync(stream);
                    }
                }

                TempData["Successful"] = "Updated successfully";
                return RedirectToAction("Index");
            }
            else
            {
                Set_Data_DropdownRole(ref model);
                TempData["IntervalServer"] = "Update failed";
            }

            return View(model);
        }

        public async Task<ActionResult> Destroy(long Id)
        {
            var entity = await _context.Users
                .Where(w => w.Id == Id)
                .FirstOrDefaultAsync();

            if (entity != null)
            {
                entity.IsDelete = true;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Index");
        }

        private void Set_Data_DropdownRole(ref UserDto model)
        {
            model.ListRoles = new List<SelectListItem>
            {                
                new SelectListItem
                {
                    Value = ((int)ERoleType.Admin).ToString(),
                    Text = "Admin"
                },
                new SelectListItem
                {
                    Value = ((int)ERoleType.Customer).ToString(),
                    Text = "Customer"
                }
            };
        }
    }
}