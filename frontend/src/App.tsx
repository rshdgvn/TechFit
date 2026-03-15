import { useState, useEffect } from "react";
import type { PredictionResponse } from "./types/predictionResponse";
import { analyzeResume } from "./api/api";
import "./index.css"; 
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import HowItWorks from "./components/HowItWorks";
import Results from "./components/Results";
import Footer from "./components/Footer";
import ComingSoon from "./components/ComingSoon";
import About from "./components/About";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResults(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeResume(file);
      setResults(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="app-shell">
      <Navbar theme={theme} setTheme={setTheme} />

      {!results ? (
        <>
          <section className="hero">
            <Hero />
            <UploadCard 
              file={file} 
              onFileSelect={handleFileSelect} 
              onAnalyze={handleAnalyze} 
              loading={loading} 
              error={error} 
            />
          </section>
          <About />
          <HowItWorks />
          <ComingSoon />
        </>
      ) : (
        <Results suggestions={results.suggestions} onReset={handleReset} />
      )}

      <Footer />
    </div>
  );
}