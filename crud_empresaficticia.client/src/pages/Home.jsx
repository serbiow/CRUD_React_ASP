import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Empresa Fictícia</h1>
            <p className="home-subtitle">Gerencie seus Clientes, Fornecedores e Produtos de forma simples e eficiente.</p>

            <div className="home-cards">
                <Link to="/clientes" className="home-card">
                    <h2>Clientes</h2>
                    <p>Cadastre e edite seus clientes.</p>
                </Link>

                <Link to="/fornecedores" className="home-card">
                    <h2>Fornecedores</h2>
                    <p>Gerencie a lista de fornecedores.</p>
                </Link>

                <Link to="/produtos" className="home-card">
                    <h2>Produtos</h2>
                    <p>Controle os produtos cadastrados.</p>
                </Link>
            </div>
        </div>
    );
}
