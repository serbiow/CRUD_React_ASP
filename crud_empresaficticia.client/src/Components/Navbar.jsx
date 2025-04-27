import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false);

    function toggleMenu() {
        setMenuAberto(!menuAberto);
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Empresa Fictícia</Link>

                {/* Botão hambúrguer */}
                <div className="hamburguer" onClick={toggleMenu}>
                    ☰
                </div>

                {/* Links do menu */}
                <div className={`navbar-links ${menuAberto ? "ativo" : ""}`}>
                    <Link to="/clientes" className="navbar-link" onClick={() => setMenuAberto(false)}>Clientes</Link>
                    <Link to="/fornecedores" className="navbar-link" onClick={() => setMenuAberto(false)}>Fornecedores</Link>
                    <Link to="/produtos" className="navbar-link" onClick={() => setMenuAberto(false)}>Produtos</Link>
                </div>
            </div>
        </nav>
    );
}
