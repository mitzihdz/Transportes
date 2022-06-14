using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Clientes
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                List<TblCliente> list = id == null ? ctx.TblClientes.Where(x => x.Estatus == true).OrderBy(x => x.RazonSocial).ToList() : ctx.TblClientes.Where(x => x.Id == id).ToList();

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

        public Response Add(TblCliente cliente)
        {
            try
            {
                cliente.RazonSocial = cliente.RazonSocial.ToUpper();
                cliente.NombreCorto = cliente.NombreCorto.ToUpper();
                cliente.Rfc = cliente.Rfc.ToUpper();
                cliente.Estatus = true;
                cliente.Inclusion = DateTime.Now;

                ctx.TblClientes.Add(cliente);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Cliente con RFC " +
                    cliente.Rfc + " Agregado Exitosamente";
                Response.Respuesta = cliente.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblCliente cliente)
        {
            try
            {
                TblCliente tblCliente = ctx.TblClientes.Find(cliente.Id);

                tblCliente.RazonSocial = cliente.RazonSocial.ToUpper();
                tblCliente.NombreCorto = cliente.NombreCorto.ToUpper();
                tblCliente.Rfc = cliente.Rfc.ToUpper();

                ctx.Entry(tblCliente).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Cliente con RFC " +
                     cliente.Rfc + " Actualizado Exitosamente";
                Response.Respuesta = cliente.Id;
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
                TblCliente tblCliente = ctx.TblClientes.Find(id);

                tblCliente.Estatus = false;

                ctx.Entry(tblCliente).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Cliente Inhabilitado Exitosamente";
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
