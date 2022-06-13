using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudController : ControllerBase
    {
        private Solicitudes solicitudes = new Solicitudes();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return solicitudes.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] Solicitud solicitud)
        {
            return solicitudes.Add(solicitud);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] Solicitud solicitud)
        {
            return solicitudes.Update(solicitud);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return solicitudes.Delete(id);
        }
    }
}
