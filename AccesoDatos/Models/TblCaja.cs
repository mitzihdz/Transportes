using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblCaja
    {
        public TblCaja()
        {
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

        public virtual TblMarcaCaja TblMarcaCajas { get; set; }
        public virtual ICollection<TblPoliza> TblPolizas { get; set; }
        public virtual ICollection<TblProveedoresCaja> TblProveedoresCajas { get; set; }
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
    }
}
