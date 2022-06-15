using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblMarcaCaja
    {
        public TblMarcaCaja()
        {
            TblCajas = new HashSet<TblCaja>();
        }

        public int Id { get; set; }
        public string Marca { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblCaja> TblCajas { get; set; }
    }
}
