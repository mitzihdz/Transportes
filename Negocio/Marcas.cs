using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Marcas
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                List<TblMarcaCaja> list = id == null ? ctx.TblMarcaCajas.Where(x => x.Activo == true).OrderBy(x => x.Marca).ToList() : ctx.TblMarcaCajas.Where(x => x.Id == id).ToList();

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

        public Response Add(TblMarcaCaja marca)
        {
            try
            {
                marca.Marca = marca.Marca.ToUpper();
                marca.Activo = true;
                marca.Inclusion = DateTime.Now;

                ctx.TblMarcaCajas.Add(marca);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Marca Agregada Exitosamente";
                Response.Respuesta = marca.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblMarcaCaja marca)
        {
            try
            {
                TblMarcaCaja tblMarcaCaja = ctx.TblMarcaCajas.Find(marca.Id);

                tblMarcaCaja.Marca = marca.Marca.ToUpper();

                ctx.Entry(tblMarcaCaja).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Marca Actualizada Exitosamente";
                Response.Respuesta = marca.Id;
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
                TblMarcaCaja tblMarcaCaja = ctx.TblMarcaCajas.Find(id);

                tblMarcaCaja.Activo = false;

                ctx.Entry(tblMarcaCaja).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Marca Inhabilitada Exitosamente";
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
