import { useEffect, useState } from "react";
import { aplicarMascaraCNPJ } from "@/Utils/utils";
import { lerMensagemErro, validarFornecedor } from "@/Utils/api";

export default function Fornecedores() {
    const [fornecedores, setFornecedores] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorEditando, setFornecedorEditando] = useState({
        id: 0,
        razaoSocial: "",
        cnpj: "",
        contato: ""
    });

    const [modoCadastro, setModoCadastro] = useState(false);
    const [novoFornecedor, setNovoFornecedor] = useState({
        razaoSocial: "",
        cnpj: "",
        contato: ""
    });

    useEffect(() => {
        buscarFornecedores();
    }, []);

    async function buscarFornecedores() {
        try {
            const resposta = await fetch("https://localhost:7187/api/Fornecedor");
            const dados = await resposta.json();
            setFornecedores(dados);
        } catch (error) {
            console.error("Erro ao buscar fornecedores:", error);
            alert("Erro ao buscar fornecedores.");
        } finally {
            setLoading(false);
        }
    }

    async function excluirFornecedor(id) {
        try {
            const respostaProdutos = await fetch(`https://localhost:7187/api/Produto`);
            const listaProdutos = await respostaProdutos.json();
            const produtosDoFornecedor = listaProdutos.filter(p => p.fornecedorId === id);

            let mensagem = "Tem certeza que deseja excluir este fornecedor?";
            if (produtosDoFornecedor.length > 0) {
                mensagem = `Este fornecedor possui ${produtosDoFornecedor.length} produto(s) cadastrado(s).\nAo excluir, TODOS os produtos também serão apagados.\n\nDeseja continuar?`;
            }

            if (!window.confirm(mensagem)) return;

            const resposta = await fetch(`https://localhost:7187/api/Fornecedor/${id}`, { method: "DELETE" });
            if (resposta.ok) {
                alert("Fornecedor excluído com sucesso!");
                buscarFornecedores();
            } else {
                const mensagemErro = await lerMensagemErro(resposta);
                alert(`Erro ao excluir fornecedor: ${mensagemErro}`);
            }
        } catch (error) {
            console.error("Erro ao excluir fornecedor:", error);
            alert("Erro inesperado ao excluir fornecedor.");
        }
    }

    function iniciarEdicao(fornecedor) {
        setModoEdicao(true);
        setFornecedorEditando(fornecedor);
    }

    async function salvarEdicao() {
        if (!validarFornecedor(fornecedorEditando)) return;

        try {
            const resposta = await fetch(`https://localhost:7187/api/Fornecedor/${fornecedorEditando.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(fornecedorEditando),
            });

            if (resposta.ok) {
                alert("Fornecedor atualizado com sucesso!");
                setModoEdicao(false);
                buscarFornecedores();
            } else {
                const erro = await resposta.json();
                alert(erro.message || "Erro ao atualizar fornecedor!");
            }
        } catch (error) {
            console.error("Erro ao atualizar fornecedor:", error);
            alert("Erro ao atualizar fornecedor!");
        }
    }

    async function cadastrarFornecedor() {
        if (!validarFornecedor(novoFornecedor)) return;

        try {
            const resposta = await fetch(`https://localhost:7187/api/Fornecedor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoFornecedor),
            });

            if (resposta.ok) {
                alert("Fornecedor cadastrado com sucesso!");
                setNovoFornecedor({ razaoSocial: "", cnpj: "", contato: "" });
                setModoCadastro(false);
                buscarFornecedores();
            } else {
                const erro = await resposta.json();
                alert(erro.message || "Erro ao cadastrar fornecedor!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar fornecedor:", error);
            alert("Erro ao cadastrar fornecedor!");
        }
    }

    return (
        <div>
            <h1>Fornecedores</h1>

            <button onClick={() => setModoCadastro(true)}>Novo Fornecedor</button>

            {/* Modal de Cadastro */}
            {modoCadastro && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Cadastrar Novo Fornecedor</h2>
                        <input
                            type="text"
                            placeholder="Razão Social"
                            value={novoFornecedor.razaoSocial}
                            onChange={(e) => setNovoFornecedor({ ...novoFornecedor, razaoSocial: e.target.value })}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={novoFornecedor.cnpj}
                            onChange={(e) => setNovoFornecedor({
                                ...novoFornecedor,
                                cnpj: aplicarMascaraCNPJ(e.target.value)
                            })}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={18}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="Contato"
                            value={novoFornecedor.contato}
                            onChange={(e) => setNovoFornecedor({ ...novoFornecedor, contato: e.target.value })}
                            required
                        />{" "}
                        <br /><br />
                        <button onClick={cadastrarFornecedor}>Salvar</button>{" "}
                        <button onClick={() => setModoCadastro(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Modal de Edição */}
            {modoEdicao && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editando Fornecedor</h2>
                        <input
                            type="text"
                            placeholder="Razão Social"
                            value={fornecedorEditando.razaoSocial}
                            onChange={(e) => setFornecedorEditando({ ...fornecedorEditando, razaoSocial: e.target.value })}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={fornecedorEditando.cnpj}
                            onChange={(e) => setFornecedorEditando({
                                ...fornecedorEditando,
                                cnpj: aplicarMascaraCNPJ(e.target.value)
                            })}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={18}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="Contato"
                            value={fornecedorEditando.contato}
                            onChange={(e) => setFornecedorEditando({ ...fornecedorEditando, contato: e.target.value })}
                            required
                        />{" "}
                        <br /><br />
                        <button onClick={salvarEdicao}>Salvar</button>{" "}
                        <button onClick={() => setModoEdicao(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Carregando fornecedores...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Razão Social</th>
                            <th>CNPJ</th>
                            <th>Contato</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map((fornecedor) => (
                            <tr key={fornecedor.id}>
                                <td data-label="ID">{fornecedor.id}</td>
                                <td data-label="Razão Social">{fornecedor.razaoSocial}</td>
                                <td data-label="CNPJ">{fornecedor.cnpj}</td>
                                <td data-label="Contato">{fornecedor.contato}</td>
                                <td data-label="Ações">
                                    <button onClick={() => excluirFornecedor(fornecedor.id)}>Excluir</button>{" "}
                                    <button onClick={() => iniciarEdicao(fornecedor)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
