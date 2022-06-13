using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblEstatus
    {
        public TblEstatus()
        {
            TblSolicituds = new HashSet<TblSolicitud>();
        }

        public int Id { get; set; }
        public string Estatus { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblSolicitud> TblSolicituds { get; set; }
    }
}
