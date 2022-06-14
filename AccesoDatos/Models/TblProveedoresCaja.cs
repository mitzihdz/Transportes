using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblProveedoresCaja
    {
        public int Id { get; set; }
        public int TblProveedoresId { get; set; }
        public int TblCajasId { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblCaja TblCajas { get; set; }
        public virtual TblProveedore TblProveedores { get; set; }
    }
}
