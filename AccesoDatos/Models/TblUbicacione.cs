using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblUbicacione
    {
        public TblUbicacione()
        {
            TblSolicitudTblUbicacionesDestinoNavigations = new HashSet<TblSolicitud>();
            TblSolicitudTblUbicacionesOrigenNavigations = new HashSet<TblSolicitud>();
        }

        public int Id { get; set; }
        public string Planta { get; set; }
        public string Ruta { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblSolicitud> TblSolicitudTblUbicacionesDestinoNavigations { get; set; }
        public virtual ICollection<TblSolicitud> TblSolicitudTblUbicacionesOrigenNavigations { get; set; }
    }
}
