import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generateWithLLaMA } from "../services/api";
import Navbar from "./NavBar";
import "./ResultPage.css";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
 
  const navigate = useNavigate();

  const handleGenerateQuiz = () => {
    navigate(`/quiz/?topic=${encodeURIComponent(topic)}`);
  };

  const [content, setContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAIResponse = async () => {
      try {
        const aiResponse = await generateWithLLaMA(`Explique sobre: ${topic}`);
        setFullContent(aiResponse);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar resposta da IA", error);
        setFullContent("Erro ao gerar resposta. Tente novamente.");
        setLoading(false);
      }
    };

    loadAIResponse();
  }, [topic]);

  useEffect(() => {
    let index = 0;
    setContent(""); // resetar animação
    const interval = setInterval(() => {
      if (index < fullContent.length) {
        setContent((prev) => prev + fullContent[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullContent]);

  return (
    <>
      <Navbar />
      <div className="result-container">
        <h2 className="result-title">Conteúdo sobre: {topic}</h2>
        {loading ? (
          <p>Gerando conteúdo com IA...</p>
        ) : (
          <p className="typed-text">{content}</p>
        )}
      </div>
      <button
      onClick={handleGenerateQuiz}
      className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
>
  Gerar Quiz
</button>
    </>
  );
};

export default ResultPage;
