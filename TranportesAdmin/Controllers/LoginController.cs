using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net.Http.Headers;
using System.Security.Claims;
using TranportesAdmin.Models;
using Microsoft.AspNetCore.Authentication;

namespace TranportesAdmin.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            if(User.Identity.IsAuthenticated)
            {
                return Redirect("/Home");
            }
            else
            {
                return View();
            }      
        }

        public async Task<IActionResult> Login(string user, string password)
        {
            try
            {
                ResponseModel model = new ResponseModel();
                bool status = false;
                int idPerfil = 0;
                string msj = string.Empty;
                string URL = "https://localhost:7259/api/Autenticacion/Select";
                string urlParameters = "?user=" + user + "&password=" + password;

                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(URL);

                // Add an Accept header for JSON format.
                client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

                // List data response.
                HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    // Parse the response body.
                    model = response.Content.ReadFromJsonAsync<ResponseModel>().Result;
                    if(model.Estado)
                    {
                        var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);
                        identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, model.Respuesta.Id.ToString()));
                        identity.AddClaim(new Claim(ClaimTypes.Name, model.Respuesta.Usuario));
                        identity.AddClaim(new Claim(ClaimTypes.Role, model.Respuesta.TblPerfilId.ToString()));
                        identity.AddClaim(new Claim(ClaimTypes.Actor, model.Respuesta.TblOperadoId == null? "" : model.Respuesta.TblOperadoId.Value.ToString()));

                        var principal = new ClaimsPrincipal(identity);
                        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal,
                            new AuthenticationProperties { ExpiresUtc = DateTime.Now.AddMinutes(60), IsPersistent = true });


                       
                        status = true;
                        msj = model.Mensaje;
                        idPerfil = model.Respuesta.TblPerfilId;

                    }
                    else
                    {
                        status = false;
                        msj = model.Mensaje;
                    }
                }
                else
                {
                    status = false;
                    msj = "Ocurrio un error al consultar el usuario: " + response.ReasonPhrase;
                }

                client.Dispose();

                return Json(new { estatus = status, mensaje = msj, perfil = idPerfil });
            }
            catch (Exception ex)
            {
                return Json(new { estatus = false, mensaje = ex.Message });
            }
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Redirect("/Login");
        }


    }
}
