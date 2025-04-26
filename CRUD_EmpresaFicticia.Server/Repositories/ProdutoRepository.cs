using CRUD_EmpresaFicticia.Server.Data;
using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRUD_EmpresaFicticia.Server.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext _context;

        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Produto>> GetAllAsync()
        {
            return await _context.Produtos.Include(p => p.Fornecedor).ToListAsync();
        }

        public async Task<Produto?> GetByIdAsync(int id)
        {
            return await _context.Produtos.Include(p => p.Fornecedor)
                                          .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Produto> CreateAsync(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task UpdateAsync(Produto produto)
        {
            _context.Produtos.Update(produto);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
                await _context.SaveChangesAsync();
            }
        }
    }
}
