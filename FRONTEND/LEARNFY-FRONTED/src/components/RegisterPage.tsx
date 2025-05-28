import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import Navbar from "./NavBar";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Cadastro realizado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Erro ao registrar. Tente novamente."
      );
    }
  };

  return (
    <>
    <Navbar />
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Cadastro</h2>

        <label htmlFor="name">Nome</label>
        <input
          id="name"
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>

        {message && <p className="erro">{message}</p>}
      </form>
    </div>
    </>
  );
};

export default RegisterPage;
