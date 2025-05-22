import { useState } from "react";
import "./LearnPage.css";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";

const LearnPage = () => {
  const [topic, setTopic] = useState("");

  const navigate = useNavigate();
  const handleLearnClick = () => {
  if (!topic.trim()) return;
  navigate(`/result?topic=${encodeURIComponent(topic)}`);
};

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title">LearnFy</h1>
        <p className="subtitle">O que você quer aprender hoje?</p>
        <input
          type="text"
          placeholder="Digite um tema, ex: Inteligência Artificial"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="input"
        />
        <button className="button" onClick={handleLearnClick}>
          Aprender
        </button>
      </div>
    </>
  );
};

export default LearnPage;
