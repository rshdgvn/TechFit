import { IcoCheck, IcoRefresh, IcoShield } from "./Icons";
import { RANKS } from "../constants/ranks";
import type { JobSuggestion } from "../types/jobSuggestion";

interface ResultsProps {
  suggestions: JobSuggestion[];
  onReset: () => void;
}

export default function Results({ suggestions, onReset }: ResultsProps) {
  const top3 = suggestions.slice(0, 3);

  return (
    <section className="results">
      <div className="results-head">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--success-light)", border: "1px solid rgba(22,163,74,0.18)", color: "var(--success)", padding: "5px 14px", borderRadius: 99, fontSize: "0.75rem", fontWeight: 600, marginBottom: 14 }}>
          <IcoCheck /> Analysis complete
        </div>
        <h2 className="results-title">Your Techfit matches</h2>
        <p className="results-sub">
          Based on your resume, here are the tech roles that best align with your skills and experience.
        </p>
      </div>

      <div className="cards-row">
        {top3.map((s, i) => {
          const RankIcon = RANKS[i].icon;
          return (
            <div key={i} className={`match-card${i === 0 ? " top" : ""} du${i + 1}`}>
              {i === 0 && <div className="top-pill">Best Match</div>}
              <div className="match-rank-label" style={{ color: RANKS[i].color }}>
                <RankIcon /> {RANKS[i].label}
              </div>
              <div className="match-title">{s.job_title}</div>
              <div className="match-score" style={{ color: RANKS[i].color }}>
                {s.confidence}
                <span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)" }}>%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${s.confidence}%`, background: RANKS[i].bar }} />
              </div>
              <div className="bar-label">Confidence score</div>
            </div>
          );
        })}
      </div>

      <div className="summary-table">
        <div className="summary-head">
          <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text-primary)" }}>Summary</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{top3.length} matches found</span>
        </div>
        {top3.map((s, i) => (
          <div key={i} className="summary-row">
            <div className="row-num">{i + 1}</div>
            <span style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
              {s.job_title}
            </span>
            <span style={{ fontWeight: 700, fontSize: "0.88rem", color: RANKS[i].color }}>
              {s.confidence}%
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", background: "var(--success-light)", border: "1px solid rgba(22,163,74,0.18)", borderRadius: "var(--r-md)", marginBottom: 24, fontSize: "0.79rem", color: "var(--success)" }}>
        <IcoShield />
        Your resume was not saved. All data was discarded by Techfit after this real-time analysis.
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn-ghost" onClick={onReset}>
          <IcoRefresh /> Match another resume
        </button>
      </div>
    </section>
  );
}