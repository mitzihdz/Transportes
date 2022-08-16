using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDocumentosTracto
    {
        public int Id { get; set; }
        public int TblDocumentoId { get; set; }
        public int TblTractoId { get; set; }
        public string Ruta { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblDocumento TblDocumento { get; set; }
        public virtual TblTracto TblTracto { get; set; }
    }
}
