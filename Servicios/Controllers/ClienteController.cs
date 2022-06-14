using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private Clientes clientes = new Clientes();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return clientes.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblCliente cliente)
        {
            return clientes.Add(cliente);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblCliente cliente)
        {
            return clientes.Update(cliente);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return clientes.Delete(id);
        }
    }
}
