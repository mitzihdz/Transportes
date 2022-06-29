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
                List<TblSolicitud> list = id == null ? ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Where(x => x.TblEstatusId != 7)//No muestra canceladas
                    .OrderBy(x => x.TblEstatusId).ToList() 
                    : ctx.TblSolicituds.Include(s => s.TblClientes)
                    .Include(s => s.TblEstatus)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblCajas)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblOperador)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblTracto)
                    .Include(s => s.TblSolicitudDetalles).ThenInclude(d => d.TblEstatusRuta)
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
                    tblSolicitud.OrdenServicio = solicitud.OrdenServicio;
                    tblSolicitud.FechaInicio = solicitud.FechaInicio;
                    tblSolicitud.FechaFin = solicitud.FechaFin;
                    tblSolicitud.Inclusion = DateTime.Now;

                    ctx.TblSolicituds.Add(tblSolicitud);
                    ctx.SaveChanges();


                    //Guarda operadores, tracto y caja 
                    foreach (SolicitudDetalle detalle in solicitud.TblSolicitudDetalles)
                    {
                        //Valida disponibilidad de operador, tracto y cajas
                        List<TblSolicitudDetalle> listado = ctx.TblSolicitudDetalles
                                                       .Where(d =>
                            //d => d.TblSolicitud.TblEstatusId <= 3 && (
                            d.FechaInicio >= detalle.FechaInicio & d.FechaInicio <= detalle.FechaFin
                                                       || d.FechaFin >= detalle.FechaInicio & d.FechaFin <= detalle.FechaFin//)
                                                       ).ToList();

                        List<TblSolicitudDetalle> operadores = listado.Where(o => o.TblOperadorId == detalle.TblOperadorId).ToList();
                        List<TblSolicitudDetalle> tractos = listado.Where(o => o.TblTractoId == detalle.TblTractoId).ToList();
                        List<TblSolicitudDetalle> cajas = listado.Where(o => o.TblCajasId == detalle.TblCajasId).ToList();

                        if(operadores.Count > 0)
                            throw new Exception("El operador no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");

                        if (tractos.Count > 0)
                            throw new Exception("El tracto no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");

                        if (cajas.Count > 0)
                            throw new Exception("La caja no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");


                        TblSolicitudDetalle tblSolicitudDetalle = new TblSolicitudDetalle();

                        tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                        tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                        tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;
                        tblSolicitudDetalle.TblEstatusRutaId = 1; //Pendiente
                        tblSolicitudDetalle.FechaInicio = detalle.FechaInicio;
                        tblSolicitudDetalle.FechaFin = detalle.FechaFin;
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
                    //Elimina operadores, tracto y caja
                    List<TblSolicitudDetalle> lstSolicitudDetalles = ctx.TblSolicitudDetalles.Where(x => x.TblSolicitudId == solicitud.Id).ToList();
                    if (lstSolicitudDetalles != null)
                    {
                        foreach (TblSolicitudDetalle detalle in lstSolicitudDetalles)
                        {
                            //Elimina rutas del detalle
                            List<TblSolicitudDetalleRuta> lstSolicitudRuta = ctx.TblSolicitudDetalleRutas.Where(x => x.TblSolicitudDetalleId == detalle.Id).ToList();
                            if (lstSolicitudRuta != null)
                            {
                                ctx.TblSolicitudDetalleRutas.RemoveRange(lstSolicitudRuta);
                                ctx.SaveChanges();
                            }
                        }

                        //Elimina detalle de solicitud
                        ctx.TblSolicitudDetalles.RemoveRange(lstSolicitudDetalles);
                        ctx.SaveChanges();
                    }

                    //Actualiza solicitud
                    TblSolicitud tblSolicitud = ctx.TblSolicituds.Find(solicitud.Id);

                    tblSolicitud.TblClientesId = solicitud.TblClientesId;
                    tblSolicitud.OrdenServicio = solicitud.OrdenServicio;
                    tblSolicitud.FechaInicio = solicitud.FechaInicio;
                    tblSolicitud.FechaFin = solicitud.FechaFin;

                    ctx.Entry(tblSolicitud).State = EntityState.Modified;
                    ctx.SaveChanges();

                    //Guarda operadores, tracto y caja 
                    foreach (SolicitudDetalle detalle in solicitud.TblSolicitudDetalles)
                    {
                        //Valida disponibilidad de operador, tracto y cajas
                        List<TblSolicitudDetalle> listado = ctx.TblSolicitudDetalles
                                                       .Where(d => d.TblSolicitud.TblEstatusId <= 3
                                                       && (d.FechaInicio >= detalle.FechaInicio & d.FechaInicio <= detalle.FechaFin
                                                       || d.FechaFin >= detalle.FechaInicio & d.FechaFin <= detalle.FechaFin)).ToList();

                        List<TblSolicitudDetalle> operadores = listado.Where(o => o.TblOperadorId == detalle.TblOperadorId).ToList();
                        List<TblSolicitudDetalle> tractos = listado.Where(o => o.TblTractoId == detalle.TblTractoId).ToList();
                        List<TblSolicitudDetalle> cajas = listado.Where(o => o.TblCajasId == detalle.TblCajasId).ToList();

                        if (operadores.Count > 0)
                            throw new Exception("El operador no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");

                        if (tractos.Count > 0)
                            throw new Exception("El tracto no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");

                        if (cajas.Count > 0)
                            throw new Exception("La caja no se encuentra disponible en el rango de fechas seleccionado, favor de validar.");


                        TblSolicitudDetalle tblSolicitudDetalle = new TblSolicitudDetalle();

                        tblSolicitudDetalle.TblTractoId = detalle.TblTractoId;
                        tblSolicitudDetalle.TblCajasId = detalle.TblCajasId;
                        tblSolicitudDetalle.TblOperadorId = detalle.TblOperadorId;
                        tblSolicitudDetalle.TblEstatusRutaId = 1; //Pendiente
                        tblSolicitudDetalle.FechaInicio = detalle.FechaInicio;
                        tblSolicitudDetalle.FechaFin = detalle.FechaFin;
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
                TblSolicitud tblSolicitud = ctx.TblSolicituds.Find(id);

                tblSolicitud.TblEstatusId = 7; //Cancelado

                ctx.Entry(tblSolicitud).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Solicitud Cancelada Exitosamente";
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response UpdateStatus(Solicitud solicitud)
        {
            try
            {
                TblSolicitud tblSolicitud = ctx.TblSolicituds.Find(solicitud.Id);
                tblSolicitud.TblEstatusId = solicitud.TblEstatusId;

                ctx.Entry(tblSolicitud).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Solicitud con Folio: " +
                        tblSolicitud.Id.ToString() + " Actualizada Exitosamente";
                Response.Respuesta = tblSolicitud.Id;
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
