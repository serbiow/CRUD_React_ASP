using CRUD_EmpresaFicticia.Server.Models;

namespace CRUD_EmpresaFicticia.Server.Services.Interfaces
{
    public interface IFornecedorService
    {
        Task<IEnumerable<Fornecedor>> GetAllAsync();
        Task<Fornecedor?> GetByIdAsync(int id);
        Task<Fornecedor> CreateAsync(Fornecedor fornecedor);
        Task UpdateAsync(Fornecedor fornecedor);
        Task DeleteAsync(int id);
    }
}