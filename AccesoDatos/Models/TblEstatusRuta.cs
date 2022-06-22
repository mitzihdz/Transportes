using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblEstatusRuta
    {
        public TblEstatusRuta()
        {
            TblSolicitudDetalles = new HashSet<TblSolicitudDetalle>();
        }

        public int Id { get; set; }
        public string Estatus { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
    }
}
