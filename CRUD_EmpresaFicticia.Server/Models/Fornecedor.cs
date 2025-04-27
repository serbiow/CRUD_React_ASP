using System.ComponentModel.DataAnnotations;

namespace CRUD_EmpresaFicticia.Server.Models
{
    public class Fornecedor
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string RazaoSocial { get; set; } = null!;

        [Required]
        [StringLength(20)]
        public string CNPJ { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string Contato { get; set; } = null!;
        public DateTime CriadoEm { get; set; }
        public ICollection<Produto> Produtos { get; set; } = new List<Produto>();
    }
}
