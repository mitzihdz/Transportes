using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblTipoDocumento
    {
        public TblTipoDocumento()
        {
            TblDocumentos = new HashSet<TblDocumento>();
        }

        public int Id { get; set; }
        public string Tipo { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore] 
        public virtual ICollection<TblDocumento> TblDocumentos { get; set; }
    }
}
