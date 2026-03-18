import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import Results from "./components/Results";
import ComingSoon from "./pages/ComingSoon";
import type { JobSuggestion } from "./types/jobSuggestion";
import { analyzeResume } from "./api/api";
import Purpose from "./pages/Purpose";
import Features from "./pages/Features";
import { supabase } from "./utils/supabase";

function AppContent() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analyzedCount, setAnalyzedCount] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>(() => {
    const saved = localStorage.getItem("techfit_results");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data, error } = await supabase
        .from("analytics") 
        .select("resumes_analyzed")
        .single(); 

      if (data && !error) {
        setAnalyzedCount(data.resumes_analyzed);
      } else {
        console.error("Error fetching count:", error);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleReset = () => {
    localStorage.removeItem("techfit_results");
    setSuggestions([]);
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeResume(file);
      setSuggestions(res.suggestions);
      if (res.new_count) setAnalyzedCount(res.new_count);
      navigate("/results");
    } catch (err: any) {
      setError(err.message || "Failed to analyze resume. Make sure the backend is running!");
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
            element={<Home analyzedCount={analyzedCount} />}
          />
          <Route
            path="/upload"
            element={
              <UploadPage
                file={file}
                onFileSelect={setFile}
                onClearFile={() => setFile(null)}
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
                onReset={() => { handleReset(); navigate("/upload"); }}
              />
            }
          />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/purpose" element={<Purpose/>} />
          <Route path="/features" element={<Features/>} />
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