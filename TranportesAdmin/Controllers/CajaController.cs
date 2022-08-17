﻿using Microsoft.AspNetCore.Mvc;

namespace TranportesAdmin.Controllers
{
    public class CajaController : Controller
    {
        public IActionResult Agregar()
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", System.Reflection.MethodBase.GetCurrentMethod().Name);
            ViewBag.IdProveedor = TempData["IdProveedor"];
            return View();
        }

        public IActionResult Editar(int id)
        {
            ISession session = HttpContext.Session;
            session.SetString("Route", System.Reflection.MethodBase.GetCurrentMethod().Name);
            ViewBag.IdCaja = id;
            return View();
        }

        [HttpPost]
        public ActionResult UploadFiles(IFormFile fileData, string name)
        {
            try
            {
                string path = Directory.GetCurrentDirectory() + @"\Files\Caja";

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
                string path = Directory.GetCurrentDirectory() + @"\Files\Caja\";
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
