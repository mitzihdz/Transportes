using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class CajasDocumentos
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response Select(int id)
        {
            try
            {
                List<TblDocumentosCaja> list = ctx.TblDocumentosCajas
                    .Include(d => d.TblDocumento)
                    .Where(x => x.TblCajasId == id).OrderBy(x => x.TblDocumento.NombreDocumento).ToList();

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

        public Response Add(TblDocumentosCaja documento)
        {
            try
            {
                documento.Inclusion = DateTime.Now;

                ctx.TblDocumentosCajas.Add(documento);
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
                TblDocumentosCaja tblDocumento = ctx.TblDocumentosCajas.Find(id);

                ctx.TblDocumentosCajas.Remove(tblDocumento);
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
