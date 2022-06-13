using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblTracto
    {
        public TblTracto()
        {
            TblPolizas = new HashSet<TblPoliza>();
            TblSolicitudDetalles = new HashSet<TblSolicitudDetalle>();
        }

        public int Id { get; set; }
        public string IdTracto { get; set; }
        public string NoEconomico { get; set; }
        public string Placas { get; set; }
        public string Modelo { get; set; }
        public string Anio { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblPoliza> TblPolizas { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
    }
}
