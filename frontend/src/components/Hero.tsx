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
  const trustItems = [
    "Securely analyzed locally",
    "Matches in under 10 seconds",
    "No account required",
  ];

  return (
    <div className="hero-wrapper" style={{ animation: "fadeUp 0.55s both" }}>
      <div className="hero-glow-blob"></div>
      <div className="hero-glow-blob hero-glow-blob--secondary"></div>

      <div className="hero-grid">
        <div className="hero-left">
          <div
            className="hero-eyebrow"
            style={{ animation: "fadeUp 0.5s 0.1s both" }}
          >
            <span className="eyebrow-dot"></span>
            <span className="eyebrow-text">
              Explore <strong>299+</strong> paths in tech
            </span>
            <span className="eyebrow-sep">·</span>
            <span className="eyebrow-sub">Discover where your skills truly fit.</span>
          </div>

          <h1
            className="hero-h1"
            style={{ animation: "fadeUp 0.5s 0.15s both" }}
          >
            Find your perfect
            <br />
            role in <em className="hero-highlight">tech.</em>
          </h1>

          <p className="hero-p" style={{ animation: "fadeUp 0.5s 0.2s both" }}>
            Not sure which tech career suits you? Upload your resume and
            Techfit's AI will analyze your skills and experience — then match
            you to the exact roles where you'll thrive most.
          </p>

          <div
            className="hero-stats-flat"
            style={{ animation: "fadeUp 0.5s 0.3s both" }}
          >
            <div className="stat-item">
              <span className="stat-icon">
                <IcoTarget />
              </span>
              <span>
                <strong>299+</strong> Tech Roles
              </span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-icon">
                <IcoChart />
              </span>
              <span>
                <strong>{analyzedCount || 0}+</strong> Analyzed
              </span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-icon">
                <IcoBrain />
              </span>
              <span>
                <strong>1k+</strong> Skills Mapped
              </span>
            </div>
          </div>

          <div
            className="hero-trust-left"
            style={{ animation: "fadeUp 0.5s 0.4s both" }}
          >
            {trustItems.map((text) => (
              <div className="trust-item-left" key={text}>
                <span className="trust-icon-left">
                  <IcoCheck />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="hero-right"
          style={{ animation: "fadeUp 0.5s 0.2s both" }}
        >
          <UploadCard
            file={file}
            onFileSelect={onFileSelect}
            onClearFile={onClearFile}
            onAnalyze={onAnalyze}
            loading={loading}
            error={error}
          />

          <div className="manual-entry-container">
            <span className="manual-divider">or</span>
            <button
              className="btn-manual-entry-blue"
              onClick={() => alert("Manual entry feature coming soon!")}
            >
              Don't have a resume? Start here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
