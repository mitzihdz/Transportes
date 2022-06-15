using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class DocumentoController : Controller
    {
        public IActionResult Index()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", String.Empty);
            return View();
        }
    }
}
