using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TractoDocumentosController : ControllerBase
    {
        private TractosDocumentos documentos = new TractosDocumentos();

        [HttpGet]
        [Route("Select")]
        public Response Get(int idTracto)
        {
            return documentos.Select(idTracto);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblDocumentosTracto documento)
        {
            return documentos.Add(documento);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return documentos.Delete(id);
        }
    }
}
