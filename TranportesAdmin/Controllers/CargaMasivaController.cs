using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;
using TranportesAdmin.Models;


namespace TranportesAdmin.Controllers
{
    public class CargaMasivaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult UploadFiles(IFormFile fileData)
        {
            try
            {
                string path = Directory.GetCurrentDirectory() + @"\Files";

                FileInfo infoFile = new FileInfo(fileData.FileName);

                if (infoFile.Extension == ".xlsx")
                {   
                    string fileName = infoFile.Name;
                    string filePath = Path.Combine(path, fileName);

                    //Valida que no exista el archivo
                    if(System.IO.File.Exists(filePath))
                    {
                        //Elimina archivo
                        System.IO.File.Delete(filePath);
                    }

                    //Guarda archivo
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        fileData.CopyTo(stream);
                    }

                    List<SolicitudesModel> list = new List<SolicitudesModel>();

                    var workbook = new XLWorkbook(filePath);
                    var worksheet = workbook.Worksheet(1);
                    var rows = worksheet.RangeUsed().RowsUsed().Skip(1); //Skip header row
                    foreach (var row in rows)
                    {
                        SolicitudesModel solicitud = new SolicitudesModel();
                        solicitud.OrigenCarga = row.Cell(1).Value.ToString();
                        solicitud.HoraTurno = row.Cell(2).Value.ToString();
                        solicitud.Destino = row.Cell(3).Value.ToString();
                        solicitud.NumViaje = row.Cell(4).Value.ToString();
                        solicitud.FechaCarga = row.Cell(5).Value.ToString();
                        solicitud.FechaDescarga = row.Cell(6).Value.ToString();
                        solicitud.Configuracion = row.Cell(7).Value.ToString();
                        solicitud.Transportista = row.Cell(8).Value.ToString();

                        list.Add(solicitud);
                    }

                    //Elimina archivo
                    System.IO.File.Delete(filePath);
                    return Json(new { estatus = true, mensaje = "OK", list = list });
                }
                else
                {
                    return Json(new { estatus = false, mensaje = "El formato permitido es (.xlsx)" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { estatus = false, mensaje = ex.Message });
            }
        }
    }
}
