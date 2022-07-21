using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Reportes
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response ReporteEstatusRutas()
        {
            try
            {
                List<TblSolicitudDetalle> list = ctx.TblSolicitudDetalles
                    .Include(s => s.TblSolicitud).ThenInclude(c => c.TblClientes)
                    .Include(d => d.TblCajas)
                    .Include(d => d.TblOperador).Include(d => d.TblTracto).Include(d => d.TblEstatusRuta)
                    .Include(r => r.TblSolicitudDetalleRuta.OrderBy(r => r.Orden)).ThenInclude(r => r.TblUbicaciones)
                    .Where(x => x.TblSolicitud.TblEstatusId != 7).ToList();

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
