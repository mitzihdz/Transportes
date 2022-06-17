using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web;

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

        [HttpPost]
        public ActionResult UploadFiles(IFormFile file)
        {
            string path = Directory.GetCurrentDirectory() + @"\Files";

            FileInfo infoFile = new FileInfo(file.FileName);
            string fileName = "Prueba" + infoFile.Extension;

            string fileNameWithPath = Path.Combine(path, fileName);

            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return Json("Files Uploaded!");
        }
    }
}
