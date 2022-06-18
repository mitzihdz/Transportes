using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class OperadoresDomicilio
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        //public TblDomicilioOper Operador { get; set; }
        //public OperadoresDomicilio(TblDomicilioOper oper_)
        //{
        //    this.Operador = oper_;
        //}
        //public String AddOperadorDom() {
        //    ctx.TblDomicilioOpers.Add(this.Operador);
        //    ctx.SaveChanges();
        //    return "Domicilio Agregado correctamente.";
        //}

        public Response Select(int? id)
        {
            try
            {
                List<TblDomicilioOper> list = id == null ? ctx.TblDomicilioOpers.ToList() : ctx.TblDomicilioOpers.Where(x => x.TblOperadorId == id).ToList();

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

        public Response Add(TblDomicilioOper domicilio)
        {
            try
            {
                domicilio.Calle = domicilio.Calle.ToUpper(); 
                domicilio.Ninte = domicilio.Ninte.ToUpper(); 
                domicilio.Nexte = domicilio.Nexte.ToUpper(); 
                domicilio.EntidadFed = domicilio.EntidadFed.ToUpper(); 
                domicilio.Municipio = domicilio.Municipio.ToUpper(); 
                domicilio.Colonia = domicilio.Colonia.ToUpper(); 
                domicilio.Referencias = domicilio.Referencias.ToUpper();
                domicilio.Inclusion = DateTime.Now;

                ctx.TblDomicilioOpers.Add(domicilio);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Domicilio Agregado Exitosamente";
                Response.Respuesta = domicilio.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblDomicilioOper domicilio)
        {
            try
            {
                TblDomicilioOper tblDomicilio = ctx.TblDomicilioOpers.Where(x => x.TblOperadorId == domicilio.TblOperadorId).FirstOrDefault();

                if (tblDomicilio != null)
                {
                    tblDomicilio.Calle = domicilio.Calle.ToUpper();
                    tblDomicilio.Ninte = domicilio.Ninte.ToUpper();
                    tblDomicilio.Nexte = domicilio.Nexte.ToUpper();
                    tblDomicilio.Cp = domicilio.Cp;
                    tblDomicilio.EntidadFed = domicilio.EntidadFed.ToUpper();
                    tblDomicilio.Municipio = domicilio.Municipio.ToUpper();
                    tblDomicilio.Colonia = domicilio.Colonia.ToUpper();
                    tblDomicilio.Referencias = domicilio.Referencias.ToUpper();

                    ctx.Entry(tblDomicilio).State = EntityState.Modified;
                    ctx.SaveChanges();

                    Response.Estado = true;
                    Response.Mensaje = "Domicilio Actualizado Exitosamente";
                    Response.Respuesta = domicilio.Id;

                    return Response;
                }
                else
                { 
                    return Add(domicilio);
                }              
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;

                return Response;
            }     
        }

        public Response Delete(int id)
        {
            try
            {
                TblDomicilioOper tblDomicilio = ctx.TblDomicilioOpers.Find(id);

                ctx.TblDomicilioOpers.Remove(tblDomicilio);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Domicilio Eliminado Exitosamente";
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