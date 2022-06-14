using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDocumentosOperadore
    {
        public int Id { get; set; }
        public int? TblDocumentosId { get; set; }
        public int? TblOperadorId { get; set; }
        public string Ruta { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblOperador TblDocumentos { get; set; }
        public virtual TblOperador TblOperador { get; set; }
    }
}
