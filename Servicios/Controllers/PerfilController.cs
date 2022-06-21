using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PerfilController : ControllerBase
    {
        private Perfiles perfiles = new Perfiles();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return perfiles.Select(id);
        }

    }
}
