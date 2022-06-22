using System.Security.Principal;
using System.Security.Claims;

namespace TranportesAdmin.Helpers
{
    public class SessionHelper
    {
        public static string GetPerfil(IPrincipal User)
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Role); 
            return r == null ? "" : r.Value;
        }
        public static string GetIdentity(IPrincipal User)
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            return r == null ? "" : r.Value;
        }
        public static string GetUser(IPrincipal User)
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Name);
            return r == null ? "" : r.Value;
        }
        public static string GetOperadorId(IPrincipal User)
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.Actor);
            return r == null ? "" : r.Value;
        }
        public static string GetValue(IPrincipal User, string Property)
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(Property);
            return r == null ? "" : r.Value;
        }
    }
}
