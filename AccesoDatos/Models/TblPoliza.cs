using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblPoliza
    {
        public int Id { get; set; }
        public string NumeroPoliza { get; set; }
        public string Poliza { get; set; }
        public int? TblTractoId { get; set; }
        public int? TblCajasId { get; set; }
        public DateTime Vencimiento { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblCaja TblCajas { get; set; }
        public virtual TblTracto TblTracto { get; set; }
    }
}
