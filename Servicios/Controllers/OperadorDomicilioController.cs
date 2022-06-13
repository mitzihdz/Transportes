using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class OperadorDomicilioController : ControllerBase
    {
        
        private OperadoresDomicilio domicilios = new OperadoresDomicilio();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return domicilios.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblDomicilioOper domicilio)
        {
            return domicilios.Add(domicilio);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblDomicilioOper domicilio)
        {
            return domicilios.Update(domicilio);
        }

        [HttpDelete]
        [Route("Delete")]
        public Response Delete(int id)
        {
            return domicilios.Delete(id);
        }
    }
}
