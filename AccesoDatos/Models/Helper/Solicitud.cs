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
        public int TblUbicacionesOrigen { get; set; }
        public int TblUbicacionesDestino { get; set; }
        public DateTime FechaSolicitud { get; set; }
        public ICollection<SolicitudDetalle> SolicitudDetalle { get; set; }
    }
    public class SolicitudDetalle
    {
        public int? Id { get; set; }
        public int TblTractoId { get; set; }
        public int TblCajasId { get; set; }
        public int TblOperadorId { get; set; }
    }
}
