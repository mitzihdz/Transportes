using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstatusSolicitudController : ControllerBase
    {
        private EstatusSolicitud estatus = new EstatusSolicitud();

        [HttpGet]
        [Route("Select")]
        public Response Get()
        {
            return estatus.Select();
        }
    }
}
