using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Graficas
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();

        public Response SelectProveedores()
        {
            try
            {
                GraphComplex graph = new GraphComplex();
                List<TblProveedore> proveedores = ctx.TblProveedores.Where(x => x.Activo == true).ToList();
                List<String> Lbls = new List<String>();
                List<int> Dt = new List<int>();
                foreach (TblProveedore item in proveedores)
                {
                    Lbls.Add(item.NombreOrazonSocial);
                    int contador = ctx.TblProveedoresCajas.Where(x=> x.TblProveedoresId == item.Id).Count();
                    Dt.Add(contador);
                }
                graph.data = Dt.ToArray();
                graph.labels = Lbls.ToArray();
                Response.Estado = true;
                Response.Mensaje = "OK";
                Response.Respuesta = graph;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }
            return Response;
        }

        public Response SelectSolicitudesCliente()
        {
            try
            {
                GraphComplex graph = new GraphComplex();
                List<TblCliente> TblCliente = ctx.TblClientes.Where(x=> x.Activo == true).ToList();
                List<String> Lbls = new List<String>();
                List<int> Dt = new List<int>();
                foreach (TblCliente item in TblCliente)
                {
                    Lbls.Add(item.NombreCorto);
                    int contador = ctx.TblSolicituds.Where(x => x.TblClientesId == item.Id).Count();
                    Dt.Add(contador);
                }
                graph.data = Dt.ToArray();
                graph.labels = Lbls.ToArray();
                Response.Estado = true;
                Response.Mensaje = "OK";
                Response.Respuesta = graph;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }
            return Response;
        }

        public Response SelectSolicitudesClienteRutas()
        {
            try
            {
                GraphComplex graph = new GraphComplex();
                List<TblSolicitud> tblsol = ctx.TblSolicituds.ToList();
                List<String> Lbls = new List<String>();
                List<int> Dt = new List<int>();
                foreach (TblSolicitud item in tblsol)
                {
                    List<TblSolicitudDetalle> tbls = ctx.TblSolicitudDetalles.Where(x => x.TblSolicitudId == item.Id).ToList();
                    String cl = ctx.TblClientes.Where(x=> x.Id == item.TblClientesId).Select(x=> x.NombreCorto).First();

                    Lbls.Add("Sol: " + item.Id+ "-" + cl);
                    int contador = ctx.TblSolicitudDetalleRutas.Where(x => x.TblSolicitudDetalleId == tbls[0].Id).Count();
                    Dt.Add(contador);
                }
                graph.data = Dt.ToArray();
                graph.labels = Lbls.ToArray();
                Response.Estado = true;
                Response.Mensaje = "OK";
                Response.Respuesta = graph;
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
