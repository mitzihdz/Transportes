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
                    .OrderBy(x => x.TblEstatusId).ThenBy(x => x.FechaSolicitud).ToList() 
                    : ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblCajas)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblOperador)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblTracto)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblSolicitudDetalleRuta).ThenInclude(r => r.TblEstatusRuta)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblSolicitudDetalleRuta).ThenInclude(r => r.TblUbicaciones)
                    .Where(x => x.Id == id).ToList();

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
                    tblSolicitud.TblEstatusId = 1;//Solicitado
                    tblSolicitud.FechaSolicitud = solicitud.FechaSolicitud;
                    tblSolicitud.Inclusion = DateTime.Now;

                    ctx.TblSolicituds.Add(tblSolicitud);
                    ctx.SaveChanges();


                    //Guarda operadores, tracto y caja
                    
                    foreach (SolicitudDetalle detalle in solicitud.TblSolicitudDetalles)
                    {
                        TblSolicitudDetalle tblSolicitudDetalle = new TblSolicitudDetalle();

                        tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                        tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                        tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;
                        tblSolicitudDetalle.TblSolicitudId = tblSolicitud.Id;
                        tblSolicitudDetalle.Inclusion = DateTime.Now;

                        ctx.TblSolicitudDetalles.Add(tblSolicitudDetalle);
                        ctx.SaveChanges();

                        //Guarda rutas
                        foreach (SolicitudDetalleRuta ruta in detalle.TblSolicitudDetalleRuta)
                        {
                            TblSolicitudDetalleRuta tblSolicitudRuta = new TblSolicitudDetalleRuta();

                            tblSolicitudRuta.TblUbicacionesId = ruta.TblUbicacionesId;
                            tblSolicitudRuta.Orden = ruta.Orden;
                            tblSolicitudRuta.TblEstatusRutaId = 1; //Pendiente
                            tblSolicitudRuta.TblSolicitudDetalleId = tblSolicitudDetalle.Id;
                            tblSolicitudRuta.Inclusion = DateTime.Now;

                            ctx.TblSolicitudDetalleRutas.AddRange(tblSolicitudRuta);
                            ctx.SaveChanges();
                        }
                    }
                    

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
                    tblSolicitud.FechaSolicitud = solicitud.FechaSolicitud;

                    ctx.Entry(tblSolicitud).State = EntityState.Modified;
                    ctx.SaveChanges();

                    //Actualiza rutas
                    //List<TblSolicitudRuta> lstSolicitudRuta = ctx.TblSolicitudRutas.Where(x => x.TblSolicitudId == solicitud.Id).ToList();
                    //if(lstSolicitudRuta != null)
                    //{
                    //    ctx.TblSolicitudRutas.RemoveRange(lstSolicitudRuta);
                    //    ctx.SaveChanges();
                    //}

                    ////Guarda rutas
                    //lstSolicitudRuta = new List<TblSolicitudRuta>();
                    //foreach (SolicitudRuta ruta in solicitud.TblSolicitudRuta)
                    //{
                    //    TblSolicitudRuta tblSolicitudRuta = new TblSolicitudRuta();

                    //    tblSolicitudRuta.TblUbicacionesId = ruta.TblUbicacionesId;
                    //    tblSolicitudRuta.Orden = ruta.Orden;
                    //    tblSolicitudRuta.TblSolicitudId = tblSolicitud.Id;
                    //    tblSolicitudRuta.Inclusion = DateTime.Now;

                    //    lstSolicitudRuta.Add(tblSolicitudRuta);
                    //}

                    //ctx.TblSolicitudRutas.AddRange(lstSolicitudRuta);
                    //ctx.SaveChanges();

                    //Actualiza operadores, tracto y caja
                    List<TblSolicitudDetalle> lstSolicitudDetalles = ctx.TblSolicitudDetalles.Where(x => x.TblSolicitudId == solicitud.Id).ToList();
                    if (lstSolicitudDetalles != null)
                    {
                        ctx.TblSolicitudDetalles.RemoveRange(lstSolicitudDetalles);
                        ctx.SaveChanges();
                    }

                    //Guarda operadores, tracto y caja
                    lstSolicitudDetalles = new List<TblSolicitudDetalle>();
                    foreach (SolicitudDetalle detalle in solicitud.TblSolicitudDetalles)
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
