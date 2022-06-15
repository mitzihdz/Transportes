using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblSolicitudRuta
    {
        public int Id { get; set; }
        public int TblUbicacionesId { get; set; }
        public int Orden { get; set; }
        public int TblSolicitudId { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblSolicitud TblSolicitud { get; set; }
        public virtual TblUbicacione TblUbicaciones { get; set; }
    }
}
