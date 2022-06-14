using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentoController : ControllerBase
    {
        private Documentos documentos = new Documentos();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return documentos.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblDocumento documento)
        {
            return documentos.Add(documento);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblDocumento documento)
        {
            return documentos.Update(documento);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return documentos.Delete(id);
        }
    }
}
