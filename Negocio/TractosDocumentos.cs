using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class TractosDocumentos
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int id)
        {
            try
            {
                List<TblDocumentosTracto> list = ctx.TblDocumentosTractos
                    .Include(d => d.TblDocumento)
                    .Where(x => x.TblTractoId == id).OrderBy(x => x.TblDocumento.NombreDocumento).ToList();

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

        public Response Add(TblDocumentosTracto documento)
        {
            try
            {
                documento.Inclusion = DateTime.Now;

                ctx.TblDocumentosTractos.Add(documento);
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

        public Response Delete(int id)
        {
            try
            {
                TblDocumentosTracto tblDocumento = ctx.TblDocumentosTractos.Find(id);

                ctx.TblDocumentosTractos.Remove(tblDocumento);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Documento Eliminado Exitosamente";
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
