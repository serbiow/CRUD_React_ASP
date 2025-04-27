using CRUD_EmpresaFicticia.Server.Models;
using CRUD_EmpresaFicticia.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CRUD_EmpresaFicticia.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly IFornecedorService _fornecedorService;

        public FornecedorController(IFornecedorService fornecedorService)
        {
            _fornecedorService = fornecedorService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetAll()
        {
            try
            {
                var fornecedores = await _fornecedorService.GetAllAsync();
                return Ok(fornecedores);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar fornecedores.", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> GetById(int id)
        {
            try
            {
                var fornecedor = await _fornecedorService.GetByIdAsync(id);
                if (fornecedor == null)
                    return NotFound(new { message = "Fornecedor não encontrado." });

                return Ok(fornecedor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar fornecedor.", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> Create(Fornecedor fornecedor)
        {
            try
            {
                var novoFornecedor = await _fornecedorService.CreateAsync(fornecedor);
                return CreatedAtAction(nameof(GetById), new { id = novoFornecedor.Id }, novoFornecedor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao cadastrar fornecedor.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fornecedor fornecedor)
        {
            if (id != fornecedor.Id)
                return BadRequest(new { message = "ID do fornecedor enviado não confere com o ID da URL." });

            try
            {
                await _fornecedorService.UpdateAsync(fornecedor);
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
                await _fornecedorService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
