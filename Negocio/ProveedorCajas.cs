using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class ProveedorCajas
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int idProveedor)
        {
            try
            {
                List<TblProveedoresCaja> list = ctx.TblProveedoresCajas
                    .Include(p => p.TblCajas).ThenInclude( c => c.TblMarcaCajas)
                    .Where(x => x.TblProveedoresId == idProveedor && x.TblCajas.Activo == true).ToList();

                Response.Estado = true;
                Response.Mensaje = "OK";
                Response.Respuesta = list;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }


    }
}
