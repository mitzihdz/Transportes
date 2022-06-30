using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : ControllerBase
    {
        private Graficas Grph_ = new Graficas();

        [HttpGet]
        [Route("SelectSolicitudesClienteRutas")]
        public Response SelectSolicitudesClienteRutas()
        {
            return Grph_.SelectSolicitudesClienteRutas();
        }
        [HttpGet]
        [Route("SelectSolicitudesCliente")]
        public Response SelectSolicitudesCliente()
        {
            return Grph_.SelectSolicitudesCliente();
        }

        [HttpGet]
        [Route("SelectProveedores")]
        public Response SelectProveedores()
        {
            return Grph_.SelectProveedores();
        }

        [HttpGet]
        [Route("SelectReporteRutas")]
        public Response SelectReporteRutas()
        {
            return Grph_.SelectReporteRutas();
        }

    }
}
