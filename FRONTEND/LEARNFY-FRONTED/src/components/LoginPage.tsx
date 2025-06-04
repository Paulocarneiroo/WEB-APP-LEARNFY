import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password
      });

      const token = response.data.token; // ou outro nome dependendo do backend
      localStorage.setItem("token", token);


      setError("");
      navigate("/"); // Redireciona para home após login bem-sucedido
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        setError("Usuário ou senha inválidos.");
      } else {
        setError("Erro ao tentar fazer login. Tente novamente.");
      }
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="erro">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
