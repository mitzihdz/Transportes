using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class Response
    {
        public Boolean Estado { get; set; }
        public String Mensaje { get; set; }
        public Object Respuesta { get; set; }
    }
}
