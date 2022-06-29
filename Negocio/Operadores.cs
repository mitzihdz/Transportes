using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Operadores
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();
        private Security SS = new Security();

        //public TblOperador Operador { get; set; }
        //public Operadores(TblOperador oper_)
        //{
        //    this.Operador = oper_;
        //}
        //public String AddOperador() {
        //    ctx.TblOperadors.Add(this.Operador);
        //    ctx.SaveChanges();
        //    return "Operador " +
        //        this.Operador.Nombre + " " +
        //        this.Operador.ApellidoPaterno + " " +
        //        this.Operador.ApellidoPaterno +
        //        " Agregado Exitosamente";
        //}

        public Response Select(int? id)
        {
            try
            {
                List<TblOperador> list = id == null ? ctx.TblOperadors.Where(x => x.Activo == true).OrderBy(x => x.ApellidoPaterno).ToList() : ctx.TblOperadors.Where(x => x.Id == id).ToList();

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

        public Response Select(DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                var listOperadores = ctx.TblSolicitudDetalles
                               .Where(d => d.TblSolicitud.TblEstatusId <= 3
                               && (d.FechaInicio >= fechaInicio & d.FechaInicio <= fechaFin
                               || d.FechaFin >= fechaInicio & d.FechaFin <= fechaFin))
                               .Select(t => t.TblOperadorId).ToList();

                List<TblOperador> list = ctx.TblOperadors.Where(x => x.Activo == true && !listOperadores.Contains(x.Id)).OrderBy(x => x.ApellidoPaterno).ToList();

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

        public Response Add(TblOperador operador)
        {
            try
            {
                operador.Activo = true;
                operador.Inclusion = DateTime.Now;

                operador.IdOperador = operador.IdOperador.ToUpper();
                operador.Nombre = operador.Nombre.ToUpper();
                operador.ApellidoMaterno = operador.ApellidoMaterno.ToUpper();
                operador.ApellidoPaterno = operador.ApellidoPaterno.ToUpper();
                operador.Rfc = operador.Rfc.ToUpper();
                operador.ComprobanteDomicilio = operador.ComprobanteDomicilio.ToUpper();
                operador.Licencia  = operador.Licencia.ToUpper();
                
                ctx.TblOperadors.Add(operador);
                ctx.SaveChanges();

                //Se agrega el usuario operador
                TblUsuario usuario = new TblUsuario();

                usuario.Usuario = operador.IdOperador.Trim().ToUpper();
                usuario.Contrasena = SS.Encrypt(SS.Base64Encode(operador.IdOperador.Trim().ToUpper()));
                usuario.TblPerfilId = 2; //Perfil Operador
                usuario.TblOperadoId = operador.Id;
                usuario.Activo = true;
                usuario.Inclusion = DateTime.Now;

                ctx.TblUsuarios.Add(usuario);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Operador " +
                    operador.Nombre + " " + operador.ApellidoPaterno + " " + operador.ApellidoPaterno + 
                    " Agregado Exitosamente";
                Response.Respuesta = operador.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblOperador operador)
        {
            try
            {
                TblOperador tblOperador = ctx.TblOperadors.Find(operador.Id);

                tblOperador.IdOperador = operador.IdOperador.ToUpper();
                tblOperador.Nombre = operador.Nombre.ToUpper();
                tblOperador.ApellidoMaterno = operador.ApellidoMaterno.ToUpper();
                tblOperador.ApellidoPaterno = operador.ApellidoPaterno.ToUpper();
                tblOperador.Rfc = operador.Rfc.ToUpper();
                tblOperador.ComprobanteDomicilio = operador.ComprobanteDomicilio.ToUpper();
                tblOperador.Telefono = operador.Telefono;
                tblOperador.Celular = operador.Celular;
                tblOperador.Licencia = operador.Licencia.ToUpper();

                ctx.Entry(tblOperador).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Operador " +
                    tblOperador.Nombre + " " + tblOperador.ApellidoPaterno + " " + tblOperador.ApellidoPaterno +
                    " Actualizado Exitosamente";
                Response.Respuesta = tblOperador.Id;
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
                TblOperador tblOperador = ctx.TblOperadors.Find(id);

                tblOperador.Activo = false;

                ctx.Entry(tblOperador).State = EntityState.Modified;
                ctx.SaveChanges();

                //Se inactiva usuario
                TblUsuario tblUsuario = ctx.TblUsuarios.Where(x => x.TblOperadoId == id).FirstOrDefault();

                if(tblUsuario != null)
                {
                    tblUsuario.Activo = false;

                    ctx.Entry(tblUsuario).State = EntityState.Modified;
                    ctx.SaveChanges();
                }    

                Response.Estado = true;
                Response.Mensaje = "Operador Inhabilitado Exitosamente";
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