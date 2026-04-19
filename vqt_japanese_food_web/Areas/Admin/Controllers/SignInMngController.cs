using JapaneseFood.Entity;
using JapaneseFood.Model;
using JapaneseFood.Model.User;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class SignInMngController : Controller
    {
        private readonly DataContext _context;
        public SignInMngController(DataContext context)
        {
            this._context = context;
        }
        public IActionResult Index()
        {
            return View();

        }

        [HttpPost]
        public ActionResult Index(LoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var User = _context.Users.Where(z => z.IsActive && z.UserName == model.UserName && z.Password == model.Password).Select(s =>
            new UserSessionDto()
            {
                Id = s.Id,
                FullName = s.FullName,
                UserName = s.UserName,
                RoleId = s.RoleId,
                Avatar = s.Avatar
            }).FirstOrDefault();
            if (User != null)
            {
                var session = HttpContext.Session;
                string jsonSave = JsonConvert.SerializeObject(User);
                session.SetString("user_info", jsonSave);
                return RedirectToAction("Index", "HomeMng", new { area = "Admin" });
            }
            else
            {
                TempData["MessagesError"] = "Not found.";
                return View(model);
            }
        }
        public ActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "HomeMng", new { area = "Admin" });
        }
    }
}
