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
            try
            {
                var produtos = await _produtoService.GetAllAsync();
                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar produtos.", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetById(int id)
        {
            try
            {
                var produto = await _produtoService.GetByIdAsync(id);
                if (produto == null)
                    return NotFound(new { message = "Produto não encontrado." });

                return Ok(produto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar produto.", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> Create(Produto produto)
        {
            try
            {
                var novoProduto = await _produtoService.CreateAsync(produto);
                return CreatedAtAction(nameof(GetById), new { id = novoProduto.Id }, novoProduto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao cadastrar produto.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Produto produto)
        {
            if (id != produto.Id)
                return BadRequest(new { message = "ID do produto enviado não confere com o ID da URL." });

            try
            {
                await _produtoService.UpdateAsync(produto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _produtoService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
