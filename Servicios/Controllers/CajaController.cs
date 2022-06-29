using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CajaController : ControllerBase
    {
        private Cajas cajas = new Cajas();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return cajas.Select(id);
        }

        [HttpGet]
        [Route("SelectCat")]
        public Response GetCat(DateTime fechaInicio, DateTime fechaFin)
        {
            return cajas.Select(fechaInicio, fechaFin);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblCaja caja)
        {
            return cajas.Add(caja);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblCaja caja)
        {
            return cajas.Update(caja);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return cajas.Delete(id);
        }
    }
}
