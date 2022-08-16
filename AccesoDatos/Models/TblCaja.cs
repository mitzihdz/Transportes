using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblCaja
    {
        public TblCaja()
        {
            TblDocumentosCajas = new HashSet<TblDocumentosCaja>();
            TblPolizas = new HashSet<TblPoliza>();
            TblProveedoresCajas = new HashSet<TblProveedoresCaja>();
            TblSolicitudDetalles = new HashSet<TblSolicitudDetalle>();
        }

        public int Id { get; set; }
        public string NoEconomico { get; set; }
        public string Placas { get; set; }
        public string AnioModelo { get; set; }
        public int? TblMarcaCajasId { get; set; }
        public string Dimensiones { get; set; }
        public bool? Activo { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblMarcaCaja TblMarcaCajas { get; set; }
        public virtual ICollection<TblDocumentosCaja> TblDocumentosCajas { get; set; }
        public virtual ICollection<TblPoliza> TblPolizas { get; set; }
        public virtual ICollection<TblProveedoresCaja> TblProveedoresCajas { get; set; }
        [JsonIgnore] 
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
    }
}
