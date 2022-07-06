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
        public Response Get()
        {
            return solicitudes.Select();
        }

        [HttpGet]
        [Route("SelectRuta")]
        public Response GetRutas(int idDetalleSolicitud)
        {
            return solicitudes.SelectRuta(idDetalleSolicitud);
        }

        [HttpPost]
        [Route("UpdateStatusRuta")]
        public Response UpdateStatusRuta([FromBody] SolicitudDetalle solicitudRuta)
        {
            return solicitudes.UpdateStatusRuta(solicitudRuta);
        }




    }
}
