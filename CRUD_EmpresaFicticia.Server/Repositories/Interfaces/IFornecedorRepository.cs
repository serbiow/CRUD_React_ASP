using CRUD_EmpresaFicticia.Server.Models;

namespace CRUD_EmpresaFicticia.Server.Repositories.Interfaces
{
    public interface IFornecedorRepository
    {
        Task<IEnumerable<Fornecedor>> GetAllAsync();
        Task<Fornecedor?> GetByIdAsync(int id);
        Task<Fornecedor> CreateAsync(Fornecedor fornecedor);
        Task UpdateAsync(Fornecedor fornecedor);
        Task DeleteAsync(int id);
    }
}
