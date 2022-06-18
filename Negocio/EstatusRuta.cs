using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class EstatusRuta
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select()
        {
            try
            {
                List<TblEstatusRuta> list = ctx.TblEstatusRutas.OrderBy(x => x.Id).ToList();

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
