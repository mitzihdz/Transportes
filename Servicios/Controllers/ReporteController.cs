using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteController : ControllerBase
    {
        private Reportes reportes = new Reportes();

        [HttpGet]
        [Route("ReporteEstatusRutas")]
        public Response ReporteEstatusRutas()
        {
            return reportes.ReporteEstatusRutas();
        }
    }
}
