using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorCajaController : ControllerBase
    {
        private ProveedorCajas proveedorCajas = new ProveedorCajas();


        [HttpGet]
        [Route("Select")]
        public Response Get(int id)
        {
            return proveedorCajas.Select(id);
        }
    }
}
