using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class SolicitudOperadores
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int idOperador, int? id)
        {
            try
            {
                List<TblSolicitud> list = new List<TblSolicitud>();
                if(id == null)
                {
                    var query = from sol in ctx.TblSolicituds
                                join det in ctx.TblSolicitudDetalles on sol.Id equals det.TblSolicitudId
                                where det.TblOperadorId == idOperador
                                select sol;

                    list = query.Include(x => x.TblClientes).Include(s => s.TblEstatus)
                        .OrderBy(x => x.TblEstatusId).ThenBy(x => x.FechaSolicitud).ToList();
                }
                else
                {
                    list = ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblCajas)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblOperador)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblTracto)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblSolicitudDetalleRuta).ThenInclude(r => r.TblEstatusRuta)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblSolicitudDetalleRuta).ThenInclude(r => r.TblUbicaciones)
                    .Where(x => x.Id == id).ToList();
                }
                

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

        public Response UpdateStatusRuta(SolicitudDetalleRuta solicitudDetalleRuta)
        {
            try
            {
                TblSolicitudDetalleRuta tblSolicitudRuta = ctx.TblSolicitudDetalleRutas.Find(solicitudDetalleRuta.Id);
                tblSolicitudRuta.TblEstatusRutaId = solicitudDetalleRuta.TblEstatusRutaId.Value;

                ctx.Entry(tblSolicitudRuta).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Ruta Actualizada Exitosamente";
                Response.Respuesta = tblSolicitudRuta.Id;
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
