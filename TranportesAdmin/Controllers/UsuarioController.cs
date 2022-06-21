using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    [Authorize]
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
