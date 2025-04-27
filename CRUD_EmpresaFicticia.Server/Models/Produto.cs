using System.ComponentModel.DataAnnotations;

namespace CRUD_EmpresaFicticia.Server.Models
{
    public class Produto
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = null!;
        public decimal Preco { get; set; }
        public int Estoque { get; set; }
        public int FornecedorId { get; set; }
        public Fornecedor? Fornecedor { get; set; }
        public DateTime CriadoEm { get; set; }
    }
}
