using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblOperador
    {
        public TblOperador()
        {
            TblDocumentosOperadores = new HashSet<TblDocumentosOperadore>();
            TblDomicilioOpers = new HashSet<TblDomicilioOper>();
            TblSolicitudDetalles = new HashSet<TblSolicitudDetalle>();
            TblUsuarios = new HashSet<TblUsuario>();
        }

        public int Id { get; set; }
        public string IdOperador { get; set; }
        public string Nombre { get; set; }
        public string ApellidoMaterno { get; set; }
        public string ApellidoPaterno { get; set; }
        public bool? DocumentoActualizado { get; set; }
        public string Rfc { get; set; }
        public bool? Activo { get; set; }
        public string ComprobanteDomicilio { get; set; }
        public string Telefono { get; set; }
        public string Celular { get; set; }
        public string Licencia { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual ICollection<TblDocumentosOperadore> TblDocumentosOperadores { get; set; }
        public virtual ICollection<TblDomicilioOper> TblDomicilioOpers { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
        [JsonIgnore]
        public virtual ICollection<TblUsuario> TblUsuarios { get; set; }
    }
}
