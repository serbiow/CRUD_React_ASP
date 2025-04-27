import { useEffect, useState } from "react";
import { aplicarMascaraTelefone } from "@/Utils/utils";
import { lerMensagemErro, validarCliente } from "@/Utils/api";

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteEditando, setClienteEditando] = useState({
        id: 0,
        nome: "",
        email: "",
        telefone: ""
    });

    const [modoCadastro, setModoCadastro] = useState(false);
    const [novoCliente, setNovoCliente] = useState({
        nome: "",
        email: "",
        telefone: ""
    });

    useEffect(() => {
        buscarClientes();
    }, []);

    async function buscarClientes() {
        try {
            const resposta = await fetch("https://localhost:7187/api/Cliente");
            const dados = await resposta.json();
            setClientes(dados);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            alert("Erro ao buscar clientes.");
        } finally {
            setLoading(false);
        }
    }

    async function excluirCliente(id) {
        if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;
        try {
            const resposta = await fetch(`https://localhost:7187/api/Cliente/${id}`, { method: "DELETE" });
            if (resposta.ok) {
                alert("Cliente excluído com sucesso!");
                buscarClientes();
            } else {
                const mensagemErro = await lerMensagemErro(resposta);
                alert(`Erro ao excluir cliente: ${mensagemErro}`);
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro inesperado ao excluir cliente.");
        }
    }

    function iniciarEdicao(cliente) {
        setModoEdicao(true);
        setClienteEditando(cliente);
    }

    async function salvarEdicao() {
        if (!validarCliente(clienteEditando)) return;

        try {
            const resposta = await fetch(`https://localhost:7187/api/Cliente/${clienteEditando.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(clienteEditando),
            });

            if (resposta.ok) {
                alert("Cliente atualizado com sucesso!");
                setModoEdicao(false);
                buscarClientes();
            } else {
                const erro = await resposta.json();
                alert(erro.message || "Erro ao atualizar cliente!");
            }
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao atualizar cliente!");
        }
    }

    async function cadastrarCliente() {
        if (!validarCliente(novoCliente)) return;

        try {
            const resposta = await fetch(`https://localhost:7187/api/Cliente`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(novoCliente),
            });

            if (resposta.ok) {
                alert("Cliente cadastrado com sucesso!");
                setNovoCliente({ nome: "", email: "", telefone: "" });
                setModoCadastro(false);
                buscarClientes();
            } else {
                const erro = await resposta.json();
                alert(erro.message || "Erro ao cadastrar cliente!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Erro ao cadastrar cliente!");
        }
    }

    return (
        <div>
            <h1>Clientes</h1>

            <button onClick={() => setModoCadastro(true)}>Novo Cliente</button>

            {/* Modal de Cadastro */}
            {modoCadastro && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Cadastrar Novo Cliente</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={novoCliente.nome}
                            onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
                            required
                        />{" "}
                        <input
                            type="email"
                            placeholder="Email"
                            value={novoCliente.email}
                            onChange={(e) => setNovoCliente({
                                ...novoCliente,
                                email: e.target.value.replace(/\s/g, "")
                            })}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={novoCliente.telefone}
                            onChange={(e) => setNovoCliente({
                                ...novoCliente,
                                telefone: aplicarMascaraTelefone(e.target.value)
                            })}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={15}
                            required
                        />{" "}
                        <br /><br />
                        <button onClick={cadastrarCliente}>Salvar</button>{" "}
                        <button onClick={() => setModoCadastro(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {/* Modal de Edição */}
            {modoEdicao && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editando Cliente</h2>
                        <input
                            type="text"
                            placeholder="Nome"
                            value={clienteEditando.nome}
                            onChange={(e) => setClienteEditando({ ...clienteEditando, nome: e.target.value })}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="Email"
                            value={clienteEditando.email}
                            onChange={(e) => setClienteEditando({
                                ...clienteEditando,
                                email: e.target.value.replace(/\s/g, "")
                            })}
                            required
                        />{" "}
                        <input
                            type="text"
                            placeholder="Telefone"
                            value={clienteEditando.telefone}
                            onChange={(e) => setClienteEditando({
                                ...clienteEditando,
                                telefone: aplicarMascaraTelefone(e.target.value)
                            })}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={15}
                            required
                        />{" "}
                        <br /><br />
                        <button onClick={salvarEdicao}>Salvar</button>{" "}
                        <button onClick={() => setModoEdicao(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Carregando clientes...</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td data-label="ID">{cliente.id}</td>
                                    <td data-label="Nome">{cliente.nome}</td>
                                    <td data-label="Email">{cliente.email}</td>
                                    <td data-label="Telefone">{cliente.telefone}</td>
                                    <td data-label="Ações">
                                        <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>{" "}
                                        <button onClick={() => iniciarEdicao(cliente)}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            )}
        </div>
    );
}
