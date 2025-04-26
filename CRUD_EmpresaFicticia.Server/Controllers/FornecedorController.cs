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
            return Ok(await _fornecedorService.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Fornecedor>> GetById(int id)
        {
            var fornecedor = await _fornecedorService.GetByIdAsync(id);
            if (fornecedor == null) return NotFound();
            return Ok(fornecedor);
        }

        [HttpPost]
        public async Task<ActionResult<Fornecedor>> Create(Fornecedor fornecedor)
        {
            var novoFornecedor = await _fornecedorService.CreateAsync(fornecedor);
            return CreatedAtAction(nameof(GetById), new { id = novoFornecedor.Id }, novoFornecedor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Fornecedor fornecedor)
        {
            if (id != fornecedor.Id) return BadRequest();
            await _fornecedorService.UpdateAsync(fornecedor);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _fornecedorService.DeleteAsync(id);
            return NoContent();
        }
    }
}
