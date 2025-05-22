import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnPage from "./components/LearnPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
