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
        public DateTime FechaSolicitud { get; set; }
        public ICollection<SolicitudRuta> TblSolicitudRuta { get; set; }
        public ICollection<SolicitudDetalle> TblSolicitudDetalles { get; set; }
    }
    public class SolicitudDetalle
    {
        public int? Id { get; set; }
        public int TblTractoId { get; set; }
        public int TblCajasId { get; set; }
        public int TblOperadorId { get; set; }
    }
    public class SolicitudRuta
    {
        public int? Id { get; set; }
        public int TblUbicacionesId { get; set; }
        public int Orden { get; set; }
    }
}
