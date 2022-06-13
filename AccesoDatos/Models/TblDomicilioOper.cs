using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblDomicilioOper
    {
        public int Id { get; set; }
        public int TblOperadorId { get; set; }
        public string Calle { get; set; }
        public string Ninte { get; set; }
        public string Nexte { get; set; }
        public string Cp { get; set; }
        public string EntidadFed { get; set; }
        public string Municipio { get; set; }
        public string Colonia { get; set; }
        public string Referencias { get; set; }
        public DateTime? Inclusion { get; set; }

        public virtual TblOperador TblOperador { get; set; }
    }
}
