using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperadorController : ControllerBase
    {
        private Operadores operadores = new Operadores();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return operadores.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblOperador operador)
        {
            return operadores.Add(operador);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblOperador operador)
        {
            return operadores.Update(operador);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return operadores.Delete(id);
        }
    }
}
