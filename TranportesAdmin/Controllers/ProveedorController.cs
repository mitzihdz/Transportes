using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    [Authorize]
    public class ProveedorController : Controller
    {
        public IActionResult Index()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", String.Empty);
            return View();
        }

        public IActionResult Agregar()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", System.Reflection.MethodBase.GetCurrentMethod().Name);
            return View();
        }

        public IActionResult Editar(int id)
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", System.Reflection.MethodBase.GetCurrentMethod().Name);
            ViewBag.IdProveedor = id;
            return View();
        }
    }
}
