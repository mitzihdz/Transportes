using System;
using System.Collections.Generic;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class TblMarcaCaja
    {
        public TblMarcaCaja()
        {
            TblCajas = new HashSet<TblCaja>();
        }

        public int Id { get; set; }
        public string Marca { get; set; }

        public virtual ICollection<TblCaja> TblCajas { get; set; }
    }
}
