using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class ReportesController : Controller
    {
        // GET: ReportesController
        public ActionResult Index()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", String.Empty);
            return View();
        }
    }
}
