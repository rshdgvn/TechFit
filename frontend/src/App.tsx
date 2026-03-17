import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Results from "./components/Results";
import ComingSoon from "./pages/ComingSoon";
import type { JobSuggestion } from "./types/jobSuggestion";
import { analyzeResume } from "./api/api";

function AppContent() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>(() => {
    const saved = localStorage.getItem("techfit_results");
    return saved ? JSON.parse(saved) : [];
  });

  const handleReset = () => {
    localStorage.removeItem("techfit_results"); 
    setSuggestions([]); 
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const res = await analyzeResume(file);

      setSuggestions(res.suggestions);

      navigate("/results");
    } catch (err: any) {
      console.error(err);
      setError(
        err.message ||
          "Failed to analyze resume. Make sure the backend is running!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <Navbar theme={theme} setTheme={setTheme} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                file={file}
                onFileSelect={setFile}
                onAnalyze={handleAnalyze}
                loading={loading}
                error={error}
              />
            }
          />

          <Route
            path="/results"
            element={
              <Results
                suggestions={suggestions}
                onReset={() => {
                  setFile(null);
                  setSuggestions([]);
                  navigate("/");
                  handleReset();
                }}
              />
            }
          />

          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
