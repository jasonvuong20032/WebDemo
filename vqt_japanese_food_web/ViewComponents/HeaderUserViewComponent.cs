using JapaneseFood.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace vqt_japanese_food_web.ViewComponents
{
    public class HeaderUserViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            UserSessionDto? user = null;

            if (HttpContext.Session != null)
            {
                var json = HttpContext.Session.GetString("user_customer");
                if (!string.IsNullOrEmpty(json))
                {
                    user = JsonConvert.DeserializeObject<UserSessionDto>(json);
                }
            }

            return View(user);
        }
    }
}