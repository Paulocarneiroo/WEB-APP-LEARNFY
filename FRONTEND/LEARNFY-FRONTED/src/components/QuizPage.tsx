import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { generateWithLLaMA } from "../services/api";
import Navbar from "./NavBar";
import "./QuizPage.css";

const QuizPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  
  const [contentQuiz, setContentQuiz] = useState("");
  const [fullContentQuiz, setFullContentQuiz] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const AIresponse = await generateWithLLaMA(`Gere um quiz sobre ${topic}`);
        setFullContentQuiz(AIresponse);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar resposta do quiz", error);
        setFullContentQuiz("Erro ao carregar quiz.");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [topic]);

  useEffect(() => {
    let index = 0;
    setContentQuiz("");
    const interval = setInterval(() => {
      if (index < fullContentQuiz.length) {
        setContentQuiz((prev) => prev + fullContentQuiz[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullContentQuiz]);

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <h2 className="quiz-title">Quiz: {topic}</h2>
        {loading ? (
          <p className="quiz-loading">Carregando quiz...</p>
        ) : (
          <div className="quiz-content">{contentQuiz}</div>
        )}
      </div>
    </>
  );
};

export default QuizPage;
