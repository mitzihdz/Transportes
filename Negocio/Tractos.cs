using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Tractos
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        //public TblTracto tracto { get; set; }
        //public Tracto(TblTracto oper_)
        //{
        //    this.tracto = oper_;
        //}
        //public String AddOperador() {
        //    ctx.TblTractos.Add(this.tracto);
        //    ctx.SaveChanges();
        //    return "Tracto con placas " +
        //        this.tracto.Placas + " " +
        //        " Agregado Exitosamente";
        //}

        public Response Select(int? id)
        {
            try
            {
                List<TblTracto> list = id == null ? ctx.TblTractos.Where(x => x.Activo == true).OrderBy(x => x.NoEconomico).ToList() : ctx.TblTractos.Where(x => x.Id == id).ToList();

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

        public Response Add(TblTracto tractor)
        {
            try
            {
                tractor.IdTracto = tractor.IdTracto.ToUpper();
                tractor.NoEconomico = tractor.NoEconomico.ToUpper();
                tractor.Placas = tractor.Placas.ToUpper();
                tractor.Modelo = tractor.Modelo.ToUpper();
                tractor.Activo = true;
                tractor.Inclusion = DateTime.Now;

                ctx.TblTractos.Add(tractor);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Tractor con Placas" +
                    tractor.Placas + " Agregado Exitosamente";
                Response.Respuesta = tractor.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblTracto tractor)
        {
            try
            {
                TblTracto tblTractor = ctx.TblTractos.Find(tractor.Id);

                tblTractor.IdTracto = tractor.IdTracto.ToUpper();
                tblTractor.NoEconomico = tractor.NoEconomico.ToUpper();
                tblTractor.Placas = tractor.Placas.ToUpper();
                tblTractor.Modelo = tractor.Modelo.ToUpper();
                tblTractor.Anio = tractor.Anio;

                ctx.Entry(tblTractor).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Tractor con Placas" +
                    tblTractor.Placas + " Actualizado Exitosamente";
                Response.Respuesta = tblTractor.Id;
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
                TblTracto tblTractor = ctx.TblTractos.Find(id);

                tblTractor.Activo = false;

                ctx.Entry(tblTractor).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Tractor Inhabilitado Exitosamente";
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