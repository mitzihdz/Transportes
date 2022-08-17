using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Documentos
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response SelectTipo()
        {
            try
            {
                List<TblTipoDocumento> list = ctx.TblTipoDocumentos.Where(x => x.Activo == true).OrderBy(x => x.Tipo).ToList();

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

        public Response Select(int? idTipo)
        {
            try
            {
                List<TblDocumento> list = idTipo == null ? ctx.TblDocumentos.Include(t => t.TblTipoDocumento).Where(x => x.Activo == true).OrderBy(x => x.TblTipoDocumento.Tipo).ThenBy(x => x.NombreDocumento).ToList() :
                    ctx.TblDocumentos.Where(x => x.TblTipoDocumentoId == idTipo && x.Activo == true).OrderBy(x => x.NombreDocumento).ToList();

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

        public Response Select(int id)
        {
            try
            {
                List<TblDocumento> list = ctx.TblDocumentos.Where(x => x.Id == id).ToList();

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

        public Response Add(TblDocumento documento)
        {
            try
            {
                documento.NombreDocumento = documento.NombreDocumento.ToUpper();
                documento.Activo = true;
                documento.Inclusion = DateTime.Now;

                ctx.TblDocumentos.Add(documento);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Documento Agregado Exitosamente";
                Response.Respuesta = documento.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblDocumento documento)
        {
            try
            {
                TblDocumento tblDocumento = ctx.TblDocumentos.Find(documento.Id);

                tblDocumento.NombreDocumento = documento.NombreDocumento.ToUpper();

                ctx.Entry(tblDocumento).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Documento Actualizado Exitosamente";
                Response.Respuesta = documento.Id;
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
                TblDocumento tblDocumento = ctx.TblDocumentos.Find(id);

                tblDocumento.Activo = false;

                ctx.Entry(tblDocumento).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Documento Inhabilitado Exitosamente";
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
