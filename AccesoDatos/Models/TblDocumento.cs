using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDocumento
    {
        public TblDocumento()
        {
            TblDocumentosCajas = new HashSet<TblDocumentosCaja>();
            TblDocumentosOperadores = new HashSet<TblDocumentosOperadore>();
            TblDocumentosTractos = new HashSet<TblDocumentosTracto>();
        }

        public int Id { get; set; }
        public int TblTipoDocumentoId { get; set; }
        public string NombreDocumento { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblTipoDocumento TblTipoDocumento { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblDocumentosCaja> TblDocumentosCajas { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblDocumentosOperadore> TblDocumentosOperadores { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblDocumentosTracto> TblDocumentosTractos { get; set; }
    }
}
