using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblUsuario
    {
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Contrasena { get; set; }
        public int Perfil { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }
    }
}
