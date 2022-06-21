using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {
        private Autenticacion autentica = new Autenticacion();

        [HttpGet]
        [Route("Select")]
        public Response Get(string user, string password)
        {
            return autentica.Select(user, password);
        }
    }
}
