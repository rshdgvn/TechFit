import { useState, useEffect } from "react";
import { IcoRefresh } from "./Icons";
import { RANKS } from "../constants/ranks";
import type { JobSuggestion } from "../types/jobSuggestion";
import "../css/Results.css";

const EmptyIcon = () => (
  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IcoChevron = ({ open }: { open: boolean }) => (
  <svg
    width="15" height="15" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.28s ease", flexShrink: 0 }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface ResultsProps {
  suggestions: JobSuggestion[];
  onReset: () => void;
}

export default function Results({ suggestions, onReset }: ResultsProps) {
  const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (suggestions && suggestions.length > 0) {
      localStorage.setItem("techfit_results", JSON.stringify(suggestions));
    }
  }, [suggestions]);

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!suggestions || suggestions.length === 0) {
    return (
      <section className="results" style={{ display: "flex", justifyContent: "center", padding: "6rem 2rem" }}>
        <div className="empty-state-card">
          <div className="empty-icon-wrap">
            <EmptyIcon />
          </div>
          <h2 className="empty-title">No matches found</h2>
          <p className="empty-body">
            Looks like you haven't uploaded a resume yet, or your session expired.
          </p>
          <button className="btn-primary" onClick={onReset}>
            Upload Resume
          </button>
        </div>
      </section>
    );
  }

  const top3 = suggestions.slice(0, 3);

  return (
    <section className="results">

      <div className="results-head" style={{ animation: "fadeUp 0.45s both" }}>
        <div>
          <p className="results-eyebrow">Techfit Analysis Complete</p>
          <h2 className="results-title">Your top matches</h2>
          <p className="results-sub">
            Based on your resume, here are the tech roles that best align with your skills and experience.
          </p>
        </div>
        <button className="btn-ghost" onClick={onReset}>
          <IcoRefresh />
          <span>Try another resume</span>
        </button>
      </div>

      <div className="cards-row">
        {top3.map((s, i) => {
          const RankIcon = RANKS[i].icon;
          const isExpanded = expandedCards[i];
          return (
            <div
              key={i}
              className={`match-card rank-${i + 1} podium-card-${i + 1}`}
              style={{ animation: `fadeUp 0.45s ${0.1 + i * 0.07}s both` }}
            >
              {i === 0 && (
                <div className="best-match-ribbon">Best Match</div>
              )}

              <div className="rank-badge-row">
                <span className={`rank-badge rank-${i + 1}`}>
                  <RankIcon /> {RANKS[i].label}
                </span>
                <span className="match-score-inline">
                  {s.confidence}<span className="score-pct">%</span>
                </span>
              </div>

              <h3 className="match-title">{s.job_title}</h3>

              <div className="bar-wrap">
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${s.confidence}%`, background: "var(--accent)" }}
                  />
                </div>
                <span className="bar-label">Confidence score</span>
              </div>

              <button
                className={`desc-toggle-btn${isExpanded ? " active" : ""}`}
                onClick={() => toggleExpand(i)}
              >
                <span>{isExpanded ? "Hide description" : "View description"}</span>
                <IcoChevron open={isExpanded} />
              </button>

              <div className={`desc-wrapper${isExpanded ? " open" : ""}`}>
                <div className="desc-inner">
                  <p className="desc-text">
                    {s.job_description || "No description available for this role."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="summary-table" style={{ animation: "fadeUp 0.45s 0.35s both" }}>
        <div className="summary-head">
          <span className="summary-head-label">Summary</span>
          <span className="summary-head-count">{top3.length} matches found</span>
        </div>
        {top3.map((s, i) => (
          <div key={i} className="summary-row">
            <div className={`row-num rank-num-${i + 1}`}>{i + 1}</div>
            <span className="row-title">{s.job_title}</span>
            <div className="row-right">
              <div className="row-bar-track">
                <div
                  className="row-bar-fill"
                  style={{ width: `${s.confidence}%`, background: "var(--accent)" }}
                />
              </div>
              <span className="row-score">{s.confidence}%</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}