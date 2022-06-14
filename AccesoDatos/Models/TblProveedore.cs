using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblProveedore
    {
        public TblProveedore()
        {
            TblProveedoresCajas = new HashSet<TblProveedoresCaja>();
        }

        public int Id { get; set; }
        public string NombreOrazonSocial { get; set; }
        public string Clave { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblProveedoresCaja> TblProveedoresCajas { get; set; }
    }
}
