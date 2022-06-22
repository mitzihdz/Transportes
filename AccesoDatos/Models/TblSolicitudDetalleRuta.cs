using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblSolicitudDetalleRuta
    {
        public int Id { get; set; }
        public int TblUbicacionesId { get; set; }
        public int Orden { get; set; }
        public int TblSolicitudDetalleId { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblSolicitudDetalle TblSolicitudDetalle { get; set; }
        public virtual TblUbicacione TblUbicaciones { get; set; }
    }
}
