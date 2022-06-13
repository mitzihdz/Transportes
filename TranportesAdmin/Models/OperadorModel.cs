using System.ComponentModel.DataAnnotations;

namespace TranportesAdmin.Models
{
    public class OperadorModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="La clave del operador es requerida")]
        public string IdOperador { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        public string ApellidoMaterno { get; set; }

        [Required(ErrorMessage = "El apellido paterno es requerido")]
        public string ApellidoPaterno { get; set; }

        [Required(ErrorMessage = "El RFC es requerido")]
        [RegularExpression(@"/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/")]
        public string Rfc { get; set; }
        public string ComprobanteDomicilio { get; set; }

        public string Telefono { get; set; }

        public string Celular { get; set; }

        [Required(ErrorMessage = "La licencia es requerida")]
        public string Licencia { get; set; }
    }
}
