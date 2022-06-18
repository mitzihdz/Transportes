using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstatusRutaController : ControllerBase
    {
        private EstatusRuta estatus = new EstatusRuta();

        [HttpGet]
        [Route("Select")]
        public Response Get()
        {
            return estatus.Select();
        }
    }
}
