using CRUD_EmpresaFicticia.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUD_EmpresaFicticia.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // DbSets -> Tabelas
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("clientes");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Telefone).HasMaxLength(20);
                entity.Property(e => e.CriadoEm)
                    .HasColumnName("criado_em")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Fornecedor>(entity =>
            {
                entity.ToTable("fornecedores");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.RazaoSocial)
                      .IsRequired()
                      .HasMaxLength(100)
                      .HasColumnName("razao_social");
                entity.Property(e => e.CNPJ)
                      .HasMaxLength(18)
                      .HasColumnName("cnpj");
                entity.Property(e => e.Contato)
                      .HasMaxLength(100)
                      .HasColumnName("contato");
                entity.Property(e => e.CriadoEm)
                      .HasColumnName("criado_em")
                      .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            modelBuilder.Entity<Produto>(entity =>
            {
                entity.ToTable("produtos");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Preco).HasColumnType("decimal(10,2)");
                entity.Property(e => e.Estoque).HasColumnType("int");
                entity.Property(e => e.CriadoEm)
                    .HasColumnName("criado_em")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(e => e.FornecedorId).HasColumnName("fornecedor_id");

                // Relacionamento: Produto → Fornecedor
                entity.HasOne(p => p.Fornecedor)
                      .WithMany(f => f.Produtos)
                      .HasForeignKey(p => p.FornecedorId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
