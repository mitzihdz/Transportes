using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace Negocio
{
    public class Autenticacion
    {
        private transportesContext ctx = new transportesContext();
        public Response Response = new Response();
        private Security SS = new Security();

        public Response Select(string user, string password)
        {
            try
            {
                string pass = SS.Encrypt(SS.Base64Encode(password));

                TblUsuario usuario = ctx.TblUsuarios.Where(x => x.Usuario == user.ToUpper() && x.Contrasena == pass && x.Activo == true).FirstOrDefault();

                if(usuario != null)
                {
                    Response.Estado = true;
                    Response.Mensaje = "OK";
                    Response.Respuesta = usuario;
                }
                else 
                {
                    Response.Estado = false;
                    Response.Mensaje = "Usuario y/o contraseña incorrecto. Favor de validar.";
                }
                
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
