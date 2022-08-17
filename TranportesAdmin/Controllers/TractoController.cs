using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    [Authorize]
    public class TractoController : Controller
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
            ViewBag.IdTracto = id;
            return View();
        }

        [HttpPost]
        public ActionResult UploadFiles(IFormFile fileData, string name)
        {
            try
            {
                string path = Directory.GetCurrentDirectory() + @"\Files\Tracto";

                FileInfo infoFile = new FileInfo(fileData.FileName);
                string fileName = name + infoFile.Extension;

                string fileNameWithPath = Path.Combine(path, fileName);

                using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                {
                    fileData.CopyTo(stream);
                }

                return Json(new { estatus = true, mensaje = "OK", file = fileName });
            }
            catch (Exception ex)
            {
                return Json(new { estatus = false, mensaje = ex.Message });
            }
        }

        public ActionResult GetPDF(string fileName)
        {
            try
            {
                string path = Directory.GetCurrentDirectory() + @"\Files\Tracto\";
                byte[] fileData = System.IO.File.ReadAllBytes(path + fileName);
                string resultFileName = String.Format("{0}.pdf", fileName);
                //Response.("Content-Disposition", "inline; filename=" + resultFileName);
                return File(fileData, "application/pdf");
            }
            catch (Exception ex)
            {
                return Json(new { estatus = false, mensaje = ex.Message });
            }
        }


    }
}
