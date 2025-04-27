export async function lerMensagemErro(resposta) {
    try {
        const erro = await resposta.json();
        return erro.message || "Erro desconhecido.";
    } catch {
        return "Erro inesperado ao processar a resposta.";
    }
}

export function validarCliente(cliente) {
    if (!cliente.nome.trim()) {
        alert("O nome � obrigat�rio.");
        return false;
    }
    if (!cliente.email.trim()) {
        alert("O email � obrigat�rio.");
        return false;
    }
    if (!cliente.telefone.trim()) {
        alert("O telefone � obrigat�rio.");
        return false;
    }
    return true;
}

export function validarFornecedor(fornecedor) {
    if (!fornecedor.razaoSocial.trim()) {
        alert("A raz�o social � obrigat�ria.");
        return false;
    }
    if (!fornecedor.cnpj.trim()) {
        alert("O CNPJ � obrigat�rio.");
        return false;
    }
    if (!fornecedor.contato.trim()) {
        alert("O contato � obrigat�rio.");
        return false;
    }
    return true;
}

export function validarProduto(produto) {
    if (!produto.nome.trim()) {
        alert("O nome do produto � obrigat�rio.");
        return false;
    }
    if (!produto.preco || isNaN(produto.preco) || produto.preco <= 0) {
        alert("O pre�o do produto deve ser maior que zero.");
        return false;
    }
    if (!produto.estoque || isNaN(produto.estoque) || produto.estoque < 0) {
        alert("O estoque do produto deve ser zero ou mais.");
        return false;
    }
    if (!produto.fornecedorId) {
        alert("Selecione um fornecedor para o produto.");
        return false;
    }
    return true;
}
