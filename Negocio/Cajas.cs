using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Cajas
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                List<TblCaja> list = id == null ? ctx.TblCajas.Where(x => x.Activo == true).OrderBy(x => x.NoEconomico).ToList() : ctx.TblCajas.Where(x => x.Id == id).ToList();

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

        public Response Select(DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                var listCajas = ctx.TblSolicitudDetalles
                                .Where(d => d.TblSolicitud.TblEstatusId <= 3
                                && (d.FechaInicio >= fechaInicio & d.FechaInicio <= fechaFin
                                || d.FechaFin >= fechaInicio & d.FechaFin <= fechaFin))
                                .Select(c => c.TblCajasId).ToList();

                List<TblCaja> list = ctx.TblCajas.Where(x => x.Activo == true && !listCajas.Contains(x.Id)).OrderBy(x => x.NoEconomico).ToList();

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

        public Response Add(TblCaja caja)
        {
            try
            {
                caja.NoEconomico = caja.NoEconomico.ToUpper();
                caja.Placas = caja.Placas.ToUpper();
                caja.Activo = true;
                caja.Inclusion = DateTime.Now;
                //Para relacion con proveedor
                caja.TblProveedoresCajas.Single().Inclusion = DateTime.Now;

                ctx.TblCajas.Add(caja);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Caja con Placas " +
                    caja.Placas + " Agregada Exitosamente";
                Response.Respuesta = caja.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblCaja caja)
        {
            try
            {
                TblCaja tblCaja = ctx.TblCajas.Find(caja.Id);

                tblCaja.NoEconomico = caja.NoEconomico;
                tblCaja.Placas = caja.Placas.ToUpper();
                tblCaja.AnioModelo = caja.AnioModelo;
                tblCaja.TblMarcaCajasId = caja.TblMarcaCajasId;
                tblCaja.Dimensiones = caja.Dimensiones;

                ctx.Entry(tblCaja).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Caja con Placas " +
                    caja.Placas + " Actualizada Exitosamente";
                Response.Respuesta = caja.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Delete(int id)
        {
            try
            {
                TblCaja tblCaja = ctx.TblCajas.Find(id);

                tblCaja.Activo = false;

                ctx.Entry(tblCaja).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Caja Inhabilitada Exitosamente";
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
