using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUD_EmpresaFicticia.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetAll()
        {
            return Ok(await _produtoService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetById(int id)
        {
            var produto = await _produtoService.GetByIdAsync(id);
            if (produto == null) return NotFound();
            return Ok(produto);
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> Create(Produto produto)
        {
            var novoProduto = await _produtoService.CreateAsync(produto);
            return CreatedAtAction(nameof(GetById), new { id = novoProduto.Id }, novoProduto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Produto produto)
        {
            if (id != produto.Id) return BadRequest();
            await _produtoService.UpdateAsync(produto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _produtoService.DeleteAsync(id);
            return NoContent();
        }
    }
}
