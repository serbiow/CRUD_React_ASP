using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Repositories.Interfaces;
using CRUD_EmpresaFicticia.Server.Services.Interfaces;

namespace CRUD_EmpresaFicticia.Server.Services
{
    public class FornecedorService : IFornecedorService
    {
        private readonly IFornecedorRepository _fornecedorRepository;

        public FornecedorService(IFornecedorRepository fornecedorRepository)
        {
            _fornecedorRepository = fornecedorRepository;
        }

        public async Task<IEnumerable<Fornecedor>> GetAllAsync()
        {
            return await _fornecedorRepository.GetAllAsync();
        }

        public async Task<Fornecedor?> GetByIdAsync(int id)
        {
            return await _fornecedorRepository.GetByIdAsync(id);
        }

        public async Task<Fornecedor> CreateAsync(Fornecedor fornecedor)
        {
            return await _fornecedorRepository.CreateAsync(fornecedor);
        }

        public async Task UpdateAsync(Fornecedor fornecedor)
        {
            await _fornecedorRepository.UpdateAsync(fornecedor);
        }

        public async Task DeleteAsync(int id)
        {
            await _fornecedorRepository.DeleteAsync(id);
        }
    }
}
