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
            TblDocumentosOperadores = new HashSet<TblDocumentosOperadore>();
        }

        public int Id { get; set; }
        public string NombreDocumento { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblDocumentosOperadore> TblDocumentosOperadores { get; set; }
    }
}
