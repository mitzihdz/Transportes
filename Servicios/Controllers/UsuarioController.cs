using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private Usuarios usuario = new Usuarios();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return usuario.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblUsuario user)
        {
            return usuario.Add(user);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblUsuario user)
        {
            return usuario.Update(user);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return usuario.Delete(id);
        }
    }
}
