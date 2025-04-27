import { useEffect, useState } from "react";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState({
        id: 0,
        nome: "",
        preco: "",
        estoque: "",
        fornecedorId: 0
    });

    const [modoCadastro, setModoCadastro] = useState(false);
    const [novoProduto, setNovoProduto] = useState({
        nome: "",
        preco: "",
        estoque: "",
        fornecedorId: 0
    });

    useEffect(() => {
        buscarProdutos();
        buscarFornecedores();
    }, []);

    async function buscarProdutos() {
        try {
            const resposta = await fetch("https://localhost:7187/api/Produto");
            const dados = await resposta.json();
            setProdutos(dados);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setLoading(false);
        }
    }

    async function buscarFornecedores() {
        try {
            const resposta = await fetch("https://localhost:7187/api/Fornecedor");
            const dados = await resposta.json();
            setFornecedores(dados);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
        }
    }

    async function excluirProduto(id) {
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

        try {
            const resposta = await fetch(`https://localhost:7187/api/Produto/${id}`, {
                method: "DELETE",
            });

            if (resposta.ok) {
                alert("Produto excluído com sucesso!");
                buscarProdutos();
            } else {
                alert("Erro ao excluir produto!");
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            alert("Erro ao excluir produto!");
        }
    }

    function iniciarEdicao(produto) {
        setModoEdicao(true);
        setProdutoEditando(produto);
    }

    async function salvarEdicao() {
        try {
            const produtoParaSalvar = {
                ...produtoEditando,
                preco: parseFloat(produtoEditando.preco),
                estoque: parseInt(produtoEditando.estoque)
            };

            const resposta = await fetch(`https://localhost:7187/api/Produto/${produtoEditando.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoParaSalvar),
            });

            if (resposta.ok) {
                alert("Produto atualizado com sucesso!");
                setModoEdicao(false);
                buscarProdutos();
            } else {
                alert("Erro ao atualizar produto!");
            }
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert("Erro ao atualizar produto!");
        }
    }

    async function cadastrarProduto() {
        try {
            const produtoParaSalvar = {
                ...novoProduto,
                preco: parseFloat(novoProduto.preco),
                estoque: parseInt(novoProduto.estoque)
            };

            const resposta = await fetch(`https://localhost:7187/api/Produto`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(produtoParaSalvar),
            });

            if (resposta.ok) {
                alert("Produto cadastrado com sucesso!");
                setNovoProduto({ nome: "", preco: "", estoque: "", fornecedorId: "" });
                setModoCadastro(false);
                buscarProdutos();
            } else {
                alert("Erro ao cadastrar produto!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            alert("Erro ao cadastrar produto!");
        }
    }

    return (
        <div>
            <h1>Produtos</h1>

            <button onClick={() => setModoCadastro(true)}>Novo Produto</button>

            {/* Modal de Cadastro */}
            {modoCadastro && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Cadastrar Novo Produto</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={novoProduto.nome}
                            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                        />{" "}
                        <input
                            type="number"
                            placeholder="Preço"
                            value={novoProduto.preco}
                            onChange={(e) => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })}
                        />{" "}
                        <input
                            type="number"
                            placeholder="Estoque"
                            value={novoProduto.estoque}
                            onChange={(e) => setNovoProduto({ ...novoProduto, estoque: parseInt(e.target.value) })}
                        />{" "}
                        <select
                            value={novoProduto.fornecedorId}
                            onChange={(e) => setNovoProduto({ ...novoProduto, fornecedorId: parseInt(e.target.value) })}
                        >
                            <option value="">Selecione um Fornecedor</option>
                            {fornecedores.map((fornecedor) => (
                                <option key={fornecedor.id} value={fornecedor.id}>
                                    {fornecedor.razaoSocial}
                                </option>
                            ))}
                        </select>
                        <br /><br />
                        <button onClick={cadastrarProduto}>Salvar</button>{" "}
                        <button onClick={() => setModoCadastro(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Modal de Edição */}
            {modoEdicao && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editando Produto</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={produtoEditando.nome}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, nome: e.target.value })}
                        />{" "}
                        <input
                            type="number"
                            placeholder="Preço"
                            value={produtoEditando.preco}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, preco: parseFloat(e.target.value) })}
                        />{" "}
                        <input
                            type="number"
                            placeholder="Estoque"
                            value={produtoEditando.estoque}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, estoque: parseInt(e.target.value) })}
                        />{" "}
                        <select
                            value={produtoEditando.fornecedorId}
                            onChange={(e) => setProdutoEditando({ ...produtoEditando, fornecedorId: parseInt(e.target.value) })}
                        >
                            <option value="">Selecione um Fornecedor</option>
                            {fornecedores.map((fornecedor) => (
                                <option key={fornecedor.id} value={fornecedor.id}>
                                    {fornecedor.razaoSocial}
                                </option>
                            ))}
                        </select>
                        <br /><br />
                        <button onClick={salvarEdicao}>Salvar</button>{" "}
                        <button onClick={() => setModoEdicao(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Carregando produtos...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th>Fornecedor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td data-label="ID">{produto.id}</td>
                                <td data-label="Nome">{produto.nome}</td>
                                <td data-label="Preço">R$ {produto.preco.toFixed(2)}</td>
                                <td data-label="Estoque">{produto.estoque}</td>
                                <td data-label="Fornecedor">
                                    {produto.fornecedor ? produto.fornecedor.razaoSocial : "Fornecedor não encontrado"}
                                </td>
                                <td data-label="Ações">
                                    <button onClick={() => excluirProduto(produto.id)}>Excluir</button>{" "}
                                    <button onClick={() => iniciarEdicao(produto)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
