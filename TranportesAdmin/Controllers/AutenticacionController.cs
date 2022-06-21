using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class AutenticacionController : Controller
    {
        public IActionResult Login()
        {
            //ISession session = HttpContext.Session;
            //session.SetString("Route", String.Empty);
            return View();
        }
    }
}
