using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", String.Empty);
            return View();
        }
    }
}
