import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => window.location.href = "/"}>
        LearnFy
      </div>
      <div className="navbar-links">
        <Link className="nav-link" to="/login">Entrar</Link>
        <Link className="nav-link" to="/register">Cadastrar</Link>
      </div>
    </nav>
  );
};

export default Navbar;
