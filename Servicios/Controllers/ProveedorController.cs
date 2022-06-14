using Microsoft.AspNetCore.Mvc;
using AccesoDatos.Models;
using Negocio;

namespace Servicios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProveedorController : ControllerBase
    {
        private Proveedores proveedores = new Proveedores();

        [HttpGet]
        [Route("Select")]
        public Response Get(int? id)
        {
            return proveedores.Select(id);
        }

        [HttpPost]
        [Route("Add")]
        public Response Add([FromBody] TblProveedore proveedor)
        {
            return proveedores.Add(proveedor);
        }

        [HttpPost]
        [Route("Update")]
        public Response Update([FromBody] TblProveedore proveedor)
        {
            return proveedores.Update(proveedor);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public Response Delete(int id)
        {
            return proveedores.Delete(id);
        }
    }
}
