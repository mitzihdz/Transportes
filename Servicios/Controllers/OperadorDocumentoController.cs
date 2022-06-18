using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperadorDocumentoController : ControllerBase
    {
        private OperadorDocumentos documentos = new OperadorDocumentos();

        [HttpGet]
        [Route("Select")]
        public Response Get(int idOperador)
        {
            return documentos.Select(idOperador);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblDocumentosOperadore documento)
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
