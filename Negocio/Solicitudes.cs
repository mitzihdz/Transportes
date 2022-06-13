using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Solicitudes
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                //List<TblSolicitudDetalle> list = id == null ? ctx.TblSolicitudDetalles.Include(s => s.TblSolicitud).OrderBy(x => x.TblSolicitud.TblEstatusId).ThenBy(x => x.TblSolicitud.FechaSolicitud).ToList() : ctx.TblSolicitudDetalles.Where(x => x.TblSolicitudId == id).ToList();

                List<TblSolicitud> list = id == null ? ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Include(s => s.TblUbicacionesOrigenNavigation)
                    .Include(s => s.TblUbicacionesDestinoNavigation).OrderBy(x => x.TblEstatusId).ThenBy(x => x.FechaSolicitud).ToList() 
                    : ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Include(s => s.TblUbicacionesOrigenNavigation)
                    .Include(s => s.TblUbicacionesDestinoNavigation)
                    .Include(s => s.TblSolicitudDetalles)
                    .ThenInclude(d => d.TblCajas)
                    .Include(s => s.TblSolicitudDetalles)
                    .ThenInclude(d => d.TblOperador)
                    .Include(s => s.TblSolicitudDetalles)
                    .ThenInclude(d => d.TblTracto).Where(x => x.Id == id).ToList();

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

        public Response Add(Solicitud solicitud)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    TblSolicitud tblSolicitud = new TblSolicitud();

                    tblSolicitud.TblClientesId = solicitud.TblClientesId;
                    tblSolicitud.TblUbicacionesOrigen = solicitud.TblUbicacionesOrigen;
                    tblSolicitud.TblUbicacionesDestino = solicitud.TblUbicacionesDestino;
                    tblSolicitud.TblEstatusId = 1;//Solicitado
                    tblSolicitud.FechaSolicitud = solicitud.FechaSolicitud;
                    tblSolicitud.Inclusion = DateTime.Now;

                    ctx.TblSolicituds.Add(tblSolicitud);
                    ctx.SaveChanges();

                    List<TblSolicitudDetalle> lstSolicitudDetalles = new List<TblSolicitudDetalle>();
                    foreach (SolicitudDetalle detalle in solicitud.SolicitudDetalle)
                    {
                        TblSolicitudDetalle tblSolicitudDetalle = new TblSolicitudDetalle();

                        tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                        tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                        tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;
                        tblSolicitudDetalle.TblSolicitudId = tblSolicitud.Id;
                        tblSolicitudDetalle.Inclusion = DateTime.Now;

                        lstSolicitudDetalles.Add(tblSolicitudDetalle);
                    }

                    ctx.TblSolicitudDetalles.AddRange(lstSolicitudDetalles);
                    ctx.SaveChanges();

                    //Confirma
                    transaction.Commit();

                    Response.Estado = true;
                    Response.Mensaje = "Solicitud con Folio: " +
                        tblSolicitud.Id.ToString() + " Creada Exitosamente";
                    Response.Respuesta = tblSolicitud.Id;
                }
                catch (Exception ex)
                {
                    //Rollback
                    transaction.Rollback();

                    Response.Estado = false;
                    Response.Mensaje = ex.Message;
                }
            }
            return Response;
        }

        public Response Update(Solicitud solicitud)
        {
            using (var transaction = ctx.Database.BeginTransaction())
            {
                try
                {
                    TblSolicitud tblSolicitud = ctx.TblSolicituds.Find(solicitud.Id);

                    tblSolicitud.TblClientesId = solicitud.TblClientesId;
                    tblSolicitud.TblUbicacionesOrigen = solicitud.TblUbicacionesOrigen;
                    tblSolicitud.TblUbicacionesDestino = solicitud.TblUbicacionesDestino;
                    tblSolicitud.TblEstatusId = 1;//Solicitado
                    tblSolicitud.FechaSolicitud = solicitud.FechaSolicitud;

                    ctx.Entry(tblSolicitud).State = EntityState.Modified;
                    ctx.SaveChanges();

                    List<TblSolicitudDetalle> lstSolicitudDetalles = new List<TblSolicitudDetalle>();
                    foreach (SolicitudDetalle detalle in solicitud.SolicitudDetalle)
                    {
                        TblSolicitudDetalle tblSolicitudDetalle = ctx.TblSolicitudDetalles.Where(x => x.TblSolicitudId == solicitud.Id && x.Id == detalle.Id).FirstOrDefault();
                        if(tblSolicitudDetalle != null)
                        {
                            tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                            tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                            tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;

                            ctx.Entry(tblSolicitudDetalle).State = EntityState.Modified;
                            ctx.SaveChanges();
                        }
                        else
                        {
                            tblSolicitudDetalle = new TblSolicitudDetalle();
                            tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                            tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                            tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;
                            tblSolicitudDetalle.TblSolicitudId = tblSolicitud.Id;
                            tblSolicitudDetalle.Inclusion = DateTime.Now;

                            ctx.TblSolicitudDetalles.Add(tblSolicitudDetalle);
                            ctx.SaveChanges();
                        }
                    }

                    //Confirma
                    transaction.Commit();

                    Response.Estado = true;
                    Response.Mensaje = "Solicitud con Folio: " +
                        tblSolicitud.Id.ToString() + " Actualizada Exitosamente";
                    Response.Respuesta = tblSolicitud.Id;
                }
                catch (Exception ex)
                {
                    //Rollback
                    transaction.Rollback();

                    Response.Estado = false;
                    Response.Mensaje = ex.Message;
                }
            }
            return Response;
        }

        public Response Delete(int id)
        {
            try
            {

                Response.Estado = true;
                Response.Mensaje = "Solicitud Inhabilitado Exitosamente";
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
