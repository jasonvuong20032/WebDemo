using Microsoft.AspNetCore.Mvc;

namespace vqt_japanese_food_web.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class HomeMngController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
