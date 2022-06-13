using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class OperadorController : Controller
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
            ViewBag.IdOperador = id;    
            return View();
        }
    }
}
