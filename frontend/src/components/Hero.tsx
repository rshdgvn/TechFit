import { useNavigate } from "react-router-dom";
import { IcoTarget, IcoChart, IcoBrain } from "./Icons";
import "../css/Hero.css";

export default function Hero({ analyzedCount }: { analyzedCount: number }) {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper" style={{ animation: "fadeUp 0.55s both" }}>
      
      {/* ── NEW: The clean moving grid background ── */}
      <div className="hero-bg-matrix"></div>
      
      <div className="hero-glow-blob" />
      <div className="hero-glow-blob hero-glow-blob--secondary" />

      <div
        className="hero-eyebrow"
        style={{ animation: "fadeUp 0.5s 0.1s both" }}
      >
        <span className="eyebrow-dot" />
        <span className="eyebrow-text">
          Explore <strong>289+</strong> paths in tech
        </span>
        <span className="eyebrow-sep">·</span>
        <span className="eyebrow-sub">
          Discover where your skills truly fit.
        </span>
      </div>

      <h1 className="hero-h1" style={{ animation: "fadeUp 0.5s 0.15s both" }}>
        Find your perfect role in <em className="hero-highlight">tech.</em>
      </h1>

      <p className="hero-p" style={{ animation: "fadeUp 0.5s 0.2s both" }}>
        Not sure which tech career suits you? Techfit analyzes your skills and
        experience — then matches you to the exact roles where you'll thrive
        most.
      </p>

      <div
        className="hero-cta-pair"
        style={{ animation: "fadeUp 0.5s 0.3s both" }}
      >
        <button className="btn-cta-primary" onClick={() => navigate("/upload")}>
          Analyze my resume
        </button>
        <button
          className="btn-cta-ghost"
          onClick={() => navigate("/upload?mode=manual")}
        >
          Don't have resume?
        </button>
      </div>

      <div
        className="hero-stats-flat"
        style={{ animation: "fadeUp 0.5s 0.25s both" }}
      >
        <div className="stat-item">
          <span className="stat-icon">
            <IcoTarget />
          </span>
          <span>
            <strong>289+</strong> Tech Roles
          </span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon">
            <IcoChart />
          </span>
          <span>
            <strong>{analyzedCount || 0}+</strong> Analyzed
          </span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-icon">
            <IcoBrain />
          </span>
          <span>
            <strong>1k+</strong> Skills Mapped
          </span>
        </div>
      </div>
    </div>
  );
}