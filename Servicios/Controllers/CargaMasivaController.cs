using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargaMasivaController : ControllerBase
    {
        private Solicitudes solicitudes = new Solicitudes();

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] Solicitud solicitud)
        {
            return solicitudes.Add(solicitud);
        }
    }
}
