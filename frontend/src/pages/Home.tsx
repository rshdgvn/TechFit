import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import WhoIsThisFor from "../components/WhoIsThisFor";

interface HomeProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
  analyzedCount: number;
  onClearFile: () => void;
}

export default function Home({
  file,
  onFileSelect,
  onAnalyze,
  loading,
  error,
  analyzedCount,
  onClearFile,
}: HomeProps) {
  return (
    <>
      <section className="hero" style={{ width: "100%" }}>
        <Hero
          analyzedCount={analyzedCount}
          file={file}
          onFileSelect={onFileSelect}
          onAnalyze={onAnalyze}
          loading={loading}
          error={error}
          onClearFile={onClearFile}
        />
      </section>
      <About />
      <HowItWorks />
    </>
  );
}