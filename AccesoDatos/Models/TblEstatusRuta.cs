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
            TblSolicitudDetalleRuta = new HashSet<TblSolicitudDetalleRuta>();
        }

        public int Id { get; set; }
        public string Estatus { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblSolicitudDetalleRuta> TblSolicitudDetalleRuta { get; set; }
    }
}
