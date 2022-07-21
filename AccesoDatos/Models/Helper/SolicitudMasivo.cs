using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class SolicitudMasivo
    {
        public string TblClientes { get; set; }
        public string? TblEstatus { get; set; }
        public string OrdenServicio { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public ICollection<SolicitudDetalleMasivo>? TblSolicitudDetalles { get; set; }
    }

    public class SolicitudDetalleMasivo
    {
        public string NumeroViaje { get; set; }
        public string TblTracto { get; set; }
        public string TblCajas { get; set; }
        public string TblOperador { get; set; }
        public string TblEstatusRuta { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public ICollection<SolicitudDetalleRutaMasivo> TblSolicitudDetalleRuta { get; set; }
    }
    public class SolicitudDetalleRutaMasivo
    {
        public string TblUbicaciones { get; set; }
        public string Orden { get; set; }
    }
}
