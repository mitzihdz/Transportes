using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Usuarios
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();
        private Security SS = new Security();

        public Response Select(int? id)
        {
            try
            {
                List<TblUsuario> list = id == null ? ctx.TblUsuarios.Include(u => u.TblPerfil).Where(x => x.Activo == true).OrderBy(x => x.Usuario).ToList() : ctx.TblUsuarios.Include(u => u.TblPerfil).Where(x => x.Id == id).ToList();

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

        public Response Add(TblUsuario usuario)
        {
            try
            {
                usuario.Usuario = usuario.Usuario.ToUpper();
                usuario.Contrasena = SS.Encrypt(SS.Base64Encode(usuario.Contrasena));
                usuario.Activo = true;
                usuario.Inclusion = DateTime.Now;

                ctx.TblUsuarios.Add(usuario);
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Usuario " +
                    usuario.Usuario + " Agregado Exitosamente";
                Response.Respuesta = usuario.Id;
            }
            catch (Exception ex)
            {
                Response.Estado = false;
                Response.Mensaje = ex.Message;
            }

            return Response;
        }

        public Response Update(TblUsuario usuario)
        {
            try
            {
                TblUsuario tblUsuario = ctx.TblUsuarios.Find(usuario.Id);

                tblUsuario.Usuario = usuario.Usuario.ToUpper();
                tblUsuario.TblPerfilId = usuario.TblPerfilId;
                if (!string.IsNullOrEmpty(usuario.Contrasena))
                    tblUsuario.Contrasena = SS.Encrypt(SS.Base64Encode(usuario.Contrasena));

                ctx.Entry(tblUsuario).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Usuario " +
                    usuario.Usuario + " Actualizado Exitosamente";
                Response.Respuesta = usuario.Id;
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
                TblUsuario tblUsuario = ctx.TblUsuarios.Find(id);

                tblUsuario.Activo = false;

                ctx.Entry(tblUsuario).State = EntityState.Modified;
                ctx.SaveChanges();

                Response.Estado = true;
                Response.Mensaje = "Usuario Inhabilitado Exitosamente";
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
