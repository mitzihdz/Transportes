using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Ubicaciones
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                List<TblUbicacione> list = id == null ? ctx.TblUbicaciones.Where(x => x.Activo == true).OrderBy(x => x.Planta).ToList() : ctx.TblUbicaciones.Where(x => x.Id == id).ToList();

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

        public Response Add(TblUbicacione ubicacion)
        {
            try
            {
                ubicacion.Planta = ubicacion.Planta.ToUpper();
                ubicacion.Ruta = ubicacion.Ruta.ToUpper();
                ubicacion.Activo = true;
                ubicacion.Inclusion = DateTime.Now;

                ctx.TblUbicaciones.Add(ubicacion);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Ubicacion Planta " +
                    ubicacion.Planta + " Agregado Exitosamente";
                Response.Respuesta = ubicacion.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblUbicacione ubicacion)
        {
            try
            {
                TblUbicacione tblUbicacion = ctx.TblUbicaciones.Find(ubicacion.Id);

                tblUbicacion.Planta = ubicacion.Planta.ToUpper();
                tblUbicacion.Ruta = ubicacion.Ruta.ToUpper();

                ctx.Entry(tblUbicacion).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Ubicacion Planta " +
                    ubicacion.Planta + " Actualizada Exitosamente";
                Response.Respuesta = ubicacion.Id;
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
                TblUbicacione tblUbicacion = ctx.TblUbicaciones.Find(id);

                tblUbicacion.Activo = false;

                ctx.Entry(tblUbicacion).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Ubicacion Inhabilitado Exitosamente";
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
