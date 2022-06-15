using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblUbicacione
    {
        public TblUbicacione()
        {
            TblSolicitudRuta = new HashSet<TblSolicitudRuta>();
        }

        public int Id { get; set; }
        public string Planta { get; set; }
        public string Ruta { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        [JsonIgnore]
        public virtual ICollection<TblSolicitudRuta> TblSolicitudRuta { get; set; }
    }
}
