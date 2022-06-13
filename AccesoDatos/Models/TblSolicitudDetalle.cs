using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblSolicitudDetalle
    {
        public int Id { get; set; }
        public int? TblTractoId { get; set; }
        public int? TblCajasId { get; set; }
        public int? TblOperadorId { get; set; }
        public int? TblSolicitudId { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblCaja TblCajas { get; set; }
        public virtual TblOperador TblOperador { get; set; }
        public virtual TblSolicitud TblSolicitud { get; set; }
        public virtual TblTracto TblTracto { get; set; }
    }
}
