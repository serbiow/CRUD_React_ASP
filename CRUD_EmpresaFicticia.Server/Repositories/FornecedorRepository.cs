using CRUD_EmpresaFicticia.Server.Data;
using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRUD_EmpresaFicticia.Server.Repositories
{
    public class FornecedorRepository : IFornecedorRepository
    {
        private readonly AppDbContext _context;

        public FornecedorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Fornecedor>> GetAllAsync()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        public async Task<Fornecedor?> GetByIdAsync(int id)
        {
            return await _context.Fornecedores.FindAsync(id);
        }

        public async Task<Fornecedor> CreateAsync(Fornecedor fornecedor)
        {
            _context.Fornecedores.Add(fornecedor);
            await _context.SaveChangesAsync();
            return fornecedor;
        }

        public async Task UpdateAsync(Fornecedor fornecedor)
        {
            _context.Fornecedores.Update(fornecedor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var fornecedor = await _context.Fornecedores.FindAsync(id);
            if (fornecedor != null)
            {
                _context.Fornecedores.Remove(fornecedor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
