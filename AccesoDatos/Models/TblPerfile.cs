using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblPerfile
    {
        public TblPerfile()
        {
            TblUsuarios = new HashSet<TblUsuario>();
        }

        public int Id { get; set; }
        public string Perfil { get; set; }
        public bool Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblUsuario> TblUsuarios { get; set; }
    }
}
