using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace AccesoDatos.Models
{
    public partial class transportesContext : DbContext
    {
        public transportesContext()
        {
        }

        public transportesContext(DbContextOptions<transportesContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCaja> TblCajas { get; set; }
        public virtual DbSet<TblCliente> TblClientes { get; set; }
        public virtual DbSet<TblDocumento> TblDocumentos { get; set; }
        public virtual DbSet<TblDocumentosOperadore> TblDocumentosOperadores { get; set; }
        public virtual DbSet<TblDomicilioOper> TblDomicilioOpers { get; set; }
        public virtual DbSet<TblEstatus> TblEstatuses { get; set; }
        public virtual DbSet<TblMarcaCaja> TblMarcaCajas { get; set; }
        public virtual DbSet<TblOperador> TblOperadors { get; set; }
        public virtual DbSet<TblPoliza> TblPolizas { get; set; }
        public virtual DbSet<TblProveedore> TblProveedores { get; set; }
        public virtual DbSet<TblProveedoresCaja> TblProveedoresCajas { get; set; }
        public virtual DbSet<TblSolicitud> TblSolicituds { get; set; }
        public virtual DbSet<TblSolicitudDetalle> TblSolicitudDetalles { get; set; }
        public virtual DbSet<TblTracto> TblTractos { get; set; }
        public virtual DbSet<TblUbicacione> TblUbicaciones { get; set; }
        public virtual DbSet<TblUsuario> TblUsuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=(localdb)\\MSSqlLocalDb;user=UsrTrasporte;password=123;database=transportes");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<TblCaja>(entity =>
            {
                entity.ToTable("tbl_cajas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AnioModelo)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Dimensiones)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Inclusion).HasColumnType("datetime");

                entity.Property(e => e.NoEconomico)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Placas)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.TblMarcaCajasId).HasColumnName("tbl_Marca_Cajas_id");

                entity.HasOne(d => d.TblMarcaCajas)
                    .WithMany(p => p.TblCajas)
                    .HasForeignKey(d => d.TblMarcaCajasId)
                    .HasConstraintName("FK__tbl_cajas__tbl_M__75A278F5");
            });

            modelBuilder.Entity<TblCliente>(entity =>
            {
                entity.ToTable("tbl_clientes");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreCorto)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.RazonSocial)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Rfc)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("RFC");
            });

            modelBuilder.Entity<TblDocumento>(entity =>
            {
                entity.ToTable("tbl_documentos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreDocumento)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TblDocumentosOperadore>(entity =>
            {
                entity.ToTable("tbl_documentos_Operadores");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Ruta)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.TblDocumentosId).HasColumnName("tbl_documentos_id");

                entity.Property(e => e.TblOperadorId).HasColumnName("tbl_operador_id");

                entity.HasOne(d => d.TblDocumentos)
                    .WithMany(p => p.TblDocumentosOperadoreTblDocumentos)
                    .HasForeignKey(d => d.TblDocumentosId)
                    .HasConstraintName("FK__tbl_docum__tbl_d__18EBB532");

                entity.HasOne(d => d.TblOperador)
                    .WithMany(p => p.TblDocumentosOperadoreTblOperadors)
                    .HasForeignKey(d => d.TblOperadorId)
                    .HasConstraintName("FK__tbl_docum__tbl_o__19DFD96B");
            });

            modelBuilder.Entity<TblDomicilioOper>(entity =>
            {
                entity.ToTable("tbl_domicilio_oper");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Calle).HasMaxLength(200);

                entity.Property(e => e.Colonia).HasMaxLength(200);

                entity.Property(e => e.Cp)
                    .HasMaxLength(200)
                    .HasColumnName("cp");

                entity.Property(e => e.EntidadFed).HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasColumnName("inclusion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Municipio).HasMaxLength(200);

                entity.Property(e => e.Nexte).HasMaxLength(200);

                entity.Property(e => e.Ninte).HasMaxLength(200);

                entity.Property(e => e.Referencias).HasMaxLength(200);

                entity.Property(e => e.TblOperadorId).HasColumnName("tbl_operador_id");

                entity.HasOne(d => d.TblOperador)
                    .WithMany(p => p.TblDomicilioOpers)
                    .HasForeignKey(d => d.TblOperadorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_domic__tbl_o__49C3F6B7");
            });

            modelBuilder.Entity<TblEstatus>(entity =>
            {
                entity.ToTable("tbl_estatus");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Estatus)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasColumnName("inclusion")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<TblMarcaCaja>(entity =>
            {
                entity.ToTable("tbl_Marca_Cajas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Marca)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<TblOperador>(entity =>
            {
                entity.ToTable("tbl_operador");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ApellidoMaterno).HasMaxLength(200);

                entity.Property(e => e.ApellidoPaterno).HasMaxLength(200);

                entity.Property(e => e.Celular).HasMaxLength(200);

                entity.Property(e => e.ComprobanteDomicilio).HasMaxLength(200);

                entity.Property(e => e.IdOperador).HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Licencia).HasMaxLength(200);

                entity.Property(e => e.Nombre).HasMaxLength(200);

                entity.Property(e => e.Rfc)
                    .HasMaxLength(200)
                    .HasColumnName("RFC");

                entity.Property(e => e.Telefono).HasMaxLength(200);
            });

            modelBuilder.Entity<TblPoliza>(entity =>
            {
                entity.ToTable("tbl_Poliza");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasColumnName("inclusion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NumeroPoliza)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Poliza)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.TblCajasId).HasColumnName("tbl_cajas_id");

                entity.Property(e => e.TblTractoId).HasColumnName("tbl_tracto_id");

                entity.Property(e => e.Vencimiento)
                    .HasColumnType("datetime")
                    .HasColumnName("vencimiento");

                entity.HasOne(d => d.TblCajas)
                    .WithMany(p => p.TblPolizas)
                    .HasForeignKey(d => d.TblCajasId)
                    .HasConstraintName("FK__tbl_Poliz__tbl_c__1EA48E88");

                entity.HasOne(d => d.TblTracto)
                    .WithMany(p => p.TblPolizas)
                    .HasForeignKey(d => d.TblTractoId)
                    .HasConstraintName("FK__tbl_Poliz__tbl_t__1DB06A4F");
            });

            modelBuilder.Entity<TblProveedore>(entity =>
            {
                entity.ToTable("tbl_proveedores");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Activo)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Clave)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.NombreOrazonSocial)
                    .IsRequired()
                    .HasMaxLength(200)
                    .HasColumnName("NombreORazonSocial");
            });

            modelBuilder.Entity<TblProveedoresCaja>(entity =>
            {
                entity.ToTable("tbl_proveedores_cajas");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion).HasColumnType("datetime");

                entity.Property(e => e.TblCajasId).HasColumnName("tbl_cajas_id");

                entity.Property(e => e.TblProveedoresId).HasColumnName("tbl_proveedores_id");

                entity.HasOne(d => d.TblCajas)
                    .WithMany(p => p.TblProveedoresCajas)
                    .HasForeignKey(d => d.TblCajasId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_prove__tbl_c__797309D9");

                entity.HasOne(d => d.TblProveedores)
                    .WithMany(p => p.TblProveedoresCajas)
                    .HasForeignKey(d => d.TblProveedoresId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__tbl_prove__tbl_p__787EE5A0");
            });

            modelBuilder.Entity<TblSolicitud>(entity =>
            {
                entity.ToTable("tbl_Solicitud");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaSolicitud).HasColumnType("datetime");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasColumnName("inclusion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TblClientesId).HasColumnName("tbl_clientes_id");

                entity.Property(e => e.TblEstatusId).HasColumnName("tbl_estatus_id");

                entity.Property(e => e.TblUbicacionesDestino).HasColumnName("tbl_Ubicaciones_destino");

                entity.Property(e => e.TblUbicacionesOrigen).HasColumnName("tbl_Ubicaciones_origen");

                entity.HasOne(d => d.TblClientes)
                    .WithMany(p => p.TblSolicituds)
                    .HasForeignKey(d => d.TblClientesId)
                    .HasConstraintName("FK__tbl_Solic__tbl_c__05D8E0BE");

                entity.HasOne(d => d.TblEstatus)
                    .WithMany(p => p.TblSolicituds)
                    .HasForeignKey(d => d.TblEstatusId)
                    .HasConstraintName("FK__tbl_Solic__tbl_e__08B54D69");

                entity.HasOne(d => d.TblUbicacionesDestinoNavigation)
                    .WithMany(p => p.TblSolicitudTblUbicacionesDestinoNavigations)
                    .HasForeignKey(d => d.TblUbicacionesDestino)
                    .HasConstraintName("FK__tbl_Solic__tbl_U__07C12930");

                entity.HasOne(d => d.TblUbicacionesOrigenNavigation)
                    .WithMany(p => p.TblSolicitudTblUbicacionesOrigenNavigations)
                    .HasForeignKey(d => d.TblUbicacionesOrigen)
                    .HasConstraintName("FK__tbl_Solic__tbl_U__06CD04F7");
            });

            modelBuilder.Entity<TblSolicitudDetalle>(entity =>
            {
                entity.ToTable("tbl_Solicitud_detalle");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasColumnName("inclusion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.TblCajasId).HasColumnName("tbl_cajas_id");

                entity.Property(e => e.TblOperadorId).HasColumnName("tbl_operador_id");

                entity.Property(e => e.TblSolicitudId).HasColumnName("tbl_Solicitud_id");

                entity.Property(e => e.TblTractoId).HasColumnName("tbl_tracto_id");

                entity.HasOne(d => d.TblCajas)
                    .WithMany(p => p.TblSolicitudDetalles)
                    .HasForeignKey(d => d.TblCajasId)
                    .HasConstraintName("FK__tbl_Solic__tbl_c__0D7A0286");

                entity.HasOne(d => d.TblOperador)
                    .WithMany(p => p.TblSolicitudDetalles)
                    .HasForeignKey(d => d.TblOperadorId)
                    .HasConstraintName("FK__tbl_Solic__tbl_o__0E6E26BF");

                entity.HasOne(d => d.TblSolicitud)
                    .WithMany(p => p.TblSolicitudDetalles)
                    .HasForeignKey(d => d.TblSolicitudId)
                    .HasConstraintName("FK__tbl_Solic__tbl_S__0F624AF8");

                entity.HasOne(d => d.TblTracto)
                    .WithMany(p => p.TblSolicitudDetalles)
                    .HasForeignKey(d => d.TblTractoId)
                    .HasConstraintName("FK__tbl_Solic__tbl_t__0C85DE4D");
            });

            modelBuilder.Entity<TblTracto>(entity =>
            {
                entity.ToTable("tbl_tracto");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Anio).HasMaxLength(200);

                entity.Property(e => e.IdTracto).HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Modelo).HasMaxLength(200);

                entity.Property(e => e.NoEconomico).HasMaxLength(200);

                entity.Property(e => e.Placas).HasMaxLength(200);
            });

            modelBuilder.Entity<TblUbicacione>(entity =>
            {
                entity.ToTable("tbl_Ubicaciones");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Planta)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Ruta).IsRequired();
            });

            modelBuilder.Entity<TblUsuario>(entity =>
            {
                entity.ToTable("tbl_Usuarios");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Contrasena)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.Inclusion)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Usuario)
                    .IsRequired()
                    .HasMaxLength(200);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
