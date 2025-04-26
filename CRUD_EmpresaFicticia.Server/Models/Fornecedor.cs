namespace CRUD_EmpresaFicticia.Server.Models
{
    public class Fornecedor
    {
        public int Id { get; set; }
        public string RazaoSocial { get; set; } = null!;
        public string CNPJ { get; set; } = null!;
        public string Contato { get; set; } = null!;
        public DateTime CriadoEm { get; set; }
        public ICollection<Produto> Produtos { get; set; } = new List<Produto>();
    }
}
