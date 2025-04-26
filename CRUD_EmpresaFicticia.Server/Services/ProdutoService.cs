using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Repositories.Interfaces;
using CRUD_EmpresaFicticia.Server.Services.Interfaces;

namespace CRUD_EmpresaFicticia.Server.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produtoRepository;

        public ProdutoService(IProdutoRepository produtoRepository)
        {
            _produtoRepository = produtoRepository;
        }

        public async Task<IEnumerable<Produto>> GetAllAsync()
        {
            return await _produtoRepository.GetAllAsync();
        }

        public async Task<Produto?> GetByIdAsync(int id)
        {
            return await _produtoRepository.GetByIdAsync(id);
        }

        public async Task<Produto> CreateAsync(Produto produto)
        {
            return await _produtoRepository.CreateAsync(produto);
        }

        public async Task UpdateAsync(Produto produto)
        {
            await _produtoRepository.UpdateAsync(produto);
        }

        public async Task DeleteAsync(int id)
        {
            await _produtoRepository.DeleteAsync(id);
        }
    }
}
