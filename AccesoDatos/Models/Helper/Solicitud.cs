using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Models
{
    public class Solicitud
    {
        public int? Id { get; set; }
        public int TblClientesId { get; set; }
        public int? TblEstatusId { get; set; }
        public string OrdenServicio { get; set; }
        public string NumeroViaje { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public ICollection<SolicitudDetalle>? TblSolicitudDetalles { get; set; }
    }
    public class SolicitudDetalle
    {
        public int? Id { get; set; }
        public int TblTractoId { get; set; }
        public int TblCajasId { get; set; }
        public int TblOperadorId { get; set; }
        public int? TblEstatusRutaId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public ICollection<SolicitudDetalleRuta> TblSolicitudDetalleRuta { get; set; }
    }
    public class SolicitudDetalleRuta
    {
        public int? Id { get; set; }
        public int TblUbicacionesId { get; set; }
        public int Orden { get; set; }      
    }
}
