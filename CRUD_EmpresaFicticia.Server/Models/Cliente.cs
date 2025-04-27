using System.ComponentModel.DataAnnotations;

namespace CRUD_EmpresaFicticia.Server.Models
{
    public class Cliente
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string Telefone { get; set; } = null!;
        public DateTime CriadoEm { get; set; }
    }
}
