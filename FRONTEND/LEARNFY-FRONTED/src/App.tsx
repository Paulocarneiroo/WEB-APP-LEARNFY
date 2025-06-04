import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnPage from "./components/LearnPage";
import ResultPage from "./components/ResultPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import QuizPage from "./components/QuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
