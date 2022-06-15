using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblCliente
    {
        public TblCliente()
        {
            TblSolicituds = new HashSet<TblSolicitud>();
        }

        public int Id { get; set; }
        public string RazonSocial { get; set; }
        public string NombreCorto { get; set; }
        public string Rfc { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblSolicitud> TblSolicituds { get; set; }
    }
}
