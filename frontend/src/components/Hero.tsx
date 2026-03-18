import { IcoCheck, IcoTarget, IcoChart, IcoBrain } from "./Icons";
import UploadCard from "./UploadCard";
import "../css/Hero.css";

export default function Hero({
  analyzedCount,
  file,
  onFileSelect,
  onClearFile,
  onAnalyze,
  loading,
  error,
}: any) {
  return (
    <div className="hero-wrapper" style={{ animation: "fadeUp 0.55s both" }}>
      <div className="hero-glow-blob" />
      <div className="hero-glow-blob hero-glow-blob--secondary" />

      <div className="hero-eyebrow" style={{ animation: "fadeUp 0.5s 0.1s both" }}>
        <span className="eyebrow-dot" />
        <span className="eyebrow-text">
          Explore <strong>289+</strong> paths in tech
        </span>
        <span className="eyebrow-sep">·</span>
        <span className="eyebrow-sub">Discover where your skills truly fit.</span>
      </div>

      <h1 className="hero-h1" style={{ animation: "fadeUp 0.5s 0.15s both" }}>
        Find your perfect role in{" "}
        <em className="hero-highlight">tech.</em>
      </h1>

      <p className="hero-p" style={{ animation: "fadeUp 0.5s 0.2s both" }}>
        Not sure which tech career suits you? Upload your resume and
        Techfit will analyze your skills and experience — then match
        you to the exact roles where you'll thrive most.
      </p>

      <div className="hero-stats-flat" style={{ animation: "fadeUp 0.5s 0.25s both" }}>
        <div className="stat-item">
          <span className="stat-icon"><IcoTarget /></span>
          <span><strong>289+</strong> Tech Roles</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon"><IcoChart /></span>
          <span><strong>{analyzedCount || 0}+</strong> Analyzed</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon"><IcoBrain /></span>
          <span><strong>1k+</strong> Skills Mapped</span>
        </div>
      </div>

      <div className="hero-upload-section" style={{ animation: "fadeUp 0.5s 0.3s both", width: "100%" }}>

        <div className="hero-cta-pair">
          <button
            className="btn-cta-primary"
            onClick={() => alert("Manual entry feature coming soon!")}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 1v14M1 8h14" />
            </svg>
            No resume? Start here
          </button>
          <button
            className="btn-cta-ghost"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="7" />
              <path d="M8 7v4M8 5h.01" />
            </svg>
            See how it works
          </button>
        </div>

        <UploadCard
          file={file}
          onFileSelect={onFileSelect}
          onClearFile={onClearFile}
          onAnalyze={onAnalyze}
          loading={loading}
          error={error}
        />

        <div className="hero-secure-strip">
          <div className="secure-strip-item">
            <span className="secure-strip-icon">
              <IcoCheck />
            </span>
            <span>Analyzed locally</span>
          </div>
          <div className="secure-strip-divider" />
          <div className="secure-strip-item">
            <span className="secure-strip-icon">
              <IcoCheck />
            </span>
            <span>Under 10 seconds</span>
          </div>
          <div className="secure-strip-divider" />
          <div className="secure-strip-item">
            <span className="secure-strip-icon">
              <IcoCheck />
            </span>
            <span>No account needed</span>
          </div>
        </div>
      </div>
    </div>
  );
}