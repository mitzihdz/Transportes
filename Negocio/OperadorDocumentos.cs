using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class OperadorDocumentos
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int id)
        {
            try
            {
                List<TblDocumentosOperadore> list = ctx.TblDocumentosOperadores
                    .Include(d => d.TblDocumentos)
                    .Where(x => x.TblOperadorId == id).OrderBy(x => x.TblDocumentos.NombreDocumento).ToList();

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

        public Response Add(TblDocumentosOperadore documento)
        {
            try
            {
                documento.Inclusion = DateTime.Now;

                ctx.TblDocumentosOperadores.Add(documento);
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
                TblDocumentosOperadore tblDocumento = ctx.TblDocumentosOperadores.Find(id);

                ctx.TblDocumentosOperadores.Remove(tblDocumento);
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
