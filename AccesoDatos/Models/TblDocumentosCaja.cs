using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDocumentosCaja
    {
        public int Id { get; set; }
        public int TblDocumentoId { get; set; }
        public int TblCajasId { get; set; }
        public string Ruta { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblCaja TblCajas { get; set; }
        public virtual TblDocumento TblDocumento { get; set; }
    }
}
