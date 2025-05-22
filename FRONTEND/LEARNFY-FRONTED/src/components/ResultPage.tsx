import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchStudyContent } from "../services/api";
import Navbar from "./NavBar";
import "./ResultPage.css";

type StudyContent = {
  id: string;
  topic: string;
  content: string;
  quiz: string;
};

const ResultPage = () => {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";

  const [content, setContent] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data: StudyContent = await fetchStudyContent(topic);
        setFullContent(data.content);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar conteúdo", error);
      }
    };

    loadContent();
  }, [topic]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullContent.length) {
        setContent((prev) => prev + fullContent[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25); // velocidade da digitação

    return () => clearInterval(interval);
  }, [fullContent]);

  return (
    <>
      <Navbar />
      <div className="result-container">
        <h2 className="result-title">Conteúdo sobre: {topic}</h2>
        {loading ? (
          <p>Carregando conteúdo...</p>
        ) : (
          <p className="typed-text">{content}</p>
        )}
      </div>
    </>
  );
};

export default ResultPage;
