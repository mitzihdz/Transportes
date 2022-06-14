using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Proveedores
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int? id)
        {
            try
            {
                List<TblProveedore> list = id == null ? ctx.TblProveedores.OrderBy(x => x.NombreOrazonSocial).ToList() : ctx.TblProveedores.Where(x => x.Id == id).ToList();

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

        public Response Add(TblProveedore proveedor)
        {
            try
            {
                proveedor.NombreOrazonSocial = proveedor.NombreOrazonSocial.ToUpper();
                proveedor.Clave = proveedor.Clave.ToUpper();
                proveedor.Activo = true;
                proveedor.Inclusion = DateTime.Now;

                ctx.TblProveedores.Add(proveedor);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Proveedor con Clave " +
                    proveedor.Clave + " Agregado Exitosamente";
                Response.Respuesta = proveedor.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblProveedore proveedor)
        {
            try
            {
                TblProveedore tblProveedor = ctx.TblProveedores.Find(proveedor.Id);

                tblProveedor.NombreOrazonSocial = proveedor.NombreOrazonSocial.ToUpper();
                tblProveedor.Clave = proveedor.Clave.ToUpper();

                ctx.Entry(tblProveedor).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Proveedor con Clave " +
                    proveedor.Clave + " Actualizada Exitosamente";
                Response.Respuesta = proveedor.Id;
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
                TblProveedore tblProveedor = ctx.TblProveedores.Find(id);

                tblProveedor.Activo = false;

                ctx.Entry(tblProveedor).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Proveedor Inhabilitada Exitosamente";
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
