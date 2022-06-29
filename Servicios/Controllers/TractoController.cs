using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TractoController : ControllerBase
    {
        private Tractos tractores = new Tractos();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return tractores.Select(id);
        }

        [HttpGet]
        [Route("SelectCat")]
        public Response GetCat(DateTime fechaInicio, DateTime fechaFin)
        {
            return tractores.Select(fechaInicio, fechaFin);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblTracto tractor)
        {
            return tractores.Add(tractor);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblTracto tractor)
        {
            return tractores.Update(tractor);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return tractores.Delete(id);
        }
    }
}
