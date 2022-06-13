using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace TranportesAdmin.Controllers
{
    public class Session : Controller
    {
        public Session(String Method, ISession ss)
        {
            ISession session = HttpContext.Session;
            ss.SetString("Route", Method);
        }
        public Session()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", String.Empty);
        }
    }
}
