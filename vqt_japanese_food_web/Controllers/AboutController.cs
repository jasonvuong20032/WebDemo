using Microsoft.AspNetCore.Mvc;

namespace vqt_japanese_food_web.Controllers
{
    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
