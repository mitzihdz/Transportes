using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UbicacionController : ControllerBase
    {
        private Ubicaciones ubicaciones = new Ubicaciones();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return ubicaciones.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblUbicacione ubicacion)
        {
            return ubicaciones.Add(ubicacion);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblUbicacione ubicacion)
        {
            return ubicaciones.Update(ubicacion);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return ubicaciones.Delete(id);
        }
    }
}
