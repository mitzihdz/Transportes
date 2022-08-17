using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CajaDocumentosController : ControllerBase
    {
        private CajasDocumentos documentos = new CajasDocumentos();

        [HttpGet]
        [Route("Select")]
        public Response Get(int idCaja)
        {
            return documentos.Select(idCaja);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblDocumentosCaja documento)
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
