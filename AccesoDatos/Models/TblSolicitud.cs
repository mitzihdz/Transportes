﻿using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblSolicitud
    {
        public TblSolicitud()
        {
            TblSolicitudDetalles = new HashSet<TblSolicitudDetalle>();
            TblSolicitudRuta = new HashSet<TblSolicitudRuta>();
        }

        public int Id { get; set; }
        public int? TblClientesId { get; set; }
        public int? TblEstatusId { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblCliente TblClientes { get; set; }
        public virtual TblEstatus TblEstatus { get; set; }
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
        public virtual ICollection<TblSolicitudRuta> TblSolicitudRuta { get; set; }
    }
}
