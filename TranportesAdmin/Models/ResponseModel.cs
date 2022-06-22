namespace TranportesAdmin.Models
{
    public class ResponseModel
    {
        public Boolean Estado { get; set; }
        public String Mensaje { get; set; }
        public UsuarioModel Respuesta { get; set; }
    }

    public class UsuarioModel
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        //public string Contrasena { get; set; }
        public int TblPerfilId { get; set; }
        public int? TblOperadoId { get; set; }
        public bool? Activo { get; set; }
        //public DateTime? Inclusion { get; set; }
    }
}
