using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class EstatusSolicitud
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select()
        {
            try
            {
                List<TblEstatus> list = ctx.TblEstatuses.OrderBy(x => x.Id).ToList();

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
