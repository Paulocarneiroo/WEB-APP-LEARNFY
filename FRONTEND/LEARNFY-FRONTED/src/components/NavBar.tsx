import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => window.location.href = "/"}>
        LearnFy
      </div>
      <div className="navbar-links">
        <a href="#" className="nav-link">Entrar</a>
        <a href="#" className="nav-link">Cadastrar</a>
      </div>
    </nav>
  );
};

export default Navbar;
