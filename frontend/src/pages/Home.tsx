import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";

interface HomeProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

export default function Home({ file, onFileSelect, onAnalyze, loading, error }: HomeProps) {
  return (
    <>
      <section className="hero">
        <Hero />
        <UploadCard 
          file={file} 
          onFileSelect={onFileSelect} 
          onAnalyze={onAnalyze} 
          loading={loading} 
          error={error} 
        />
      </section>
      <About />
      <HowItWorks />
    </>
  );
}