import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simples simulação de login
    if (email === "teste@learnfy.com" && senha === "123456") {
      setErro("");
      navigate("/"); // redireciona para home
    } else {
      setErro("Email ou senha inválidos.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Entrar</h2>

          <label>Email:</label>
          <input
            type="email"
            placeholder="exemplo@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="erro">{erro}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
