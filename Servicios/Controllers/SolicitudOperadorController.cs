using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SolicitudOperadorController : ControllerBase
    {
        private SolicitudOperadores solicitudes = new SolicitudOperadores();

        [HttpGet]
        [Route("Select")]
        public Response Get(int idOperador, int? id)
        {
            return solicitudes.Select(idOperador, id);
        }

        [HttpPost]
        [Route("UpdateStatusRuta")]
        public Response UpdateStatusRuta([FromBody] SolicitudDetalleRuta solicitudRuta)
        {
            return solicitudes.UpdateStatusRuta(solicitudRuta);
        }




    }
}
