﻿using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class SolicitudOperadores
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select()
        {
            try
            {
                List<TblSolicitudDetalle> list = ctx.TblSolicitudDetalles
                    .Include(s => s.TblSolicitud)
                    .Include(d => d.TblCajas)
                    .Include(d => d.TblOperador).Include(d => d.TblTracto).Include(d => d.TblEstatusRuta)
                    .Include(r => r.TblSolicitudDetalleRuta.OrderBy(r => r.Orden)).ThenInclude(r => r.TblUbicaciones)
                    //.Where(x => x.TblOperadorId == idOperador && x.TblSolicitud.TblEstatusId != 7).ToList();
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

        public Response SelectRuta(int idDetalleSolicitud)
        {
            try
            {
                List<TblSolicitudDetalleRuta> list = ctx.TblSolicitudDetalleRutas
                    .Include(r => r.TblUbicaciones)
                    .Where(r => r.TblSolicitudDetalleId == idDetalleSolicitud)
                    .OrderBy(r => r.Orden).ToList();

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

        public Response UpdateStatusRuta(SolicitudDetalle solicitudDetalle)
        {
            try
            {
                TblSolicitudDetalle tblSolicitudRuta = ctx.TblSolicitudDetalles.Find(solicitudDetalle.Id);
                tblSolicitudRuta.TblEstatusRutaId = solicitudDetalle.TblEstatusRutaId.Value;

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
