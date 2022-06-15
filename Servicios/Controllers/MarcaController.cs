using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcaController : ControllerBase
    {
        private Marcas marcas = new Marcas();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return marcas.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblMarcaCaja marca)
        {
            return marcas.Add(marca);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblMarcaCaja marca)
        {
            return marcas.Update(marca);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return marcas.Delete(id);
        }
    }
}
