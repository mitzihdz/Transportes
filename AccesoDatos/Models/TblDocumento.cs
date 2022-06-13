using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDocumento
    {
        public int Id { get; set; }
        public string NombreDocumento { get; set; }
        public DateTime? Inclusion { get; set; }
    }
}
