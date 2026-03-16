import { useState, useEffect } from "react"; 
import { IcoRefresh } from "./Icons";
import { RANKS } from "../constants/ranks";
import type { JobSuggestion } from "../types/jobSuggestion";
import "../css/Results.css";

const EmptyIcon = () => (
  <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)", marginBottom: "16px" }}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IcoChevron = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
    <polyline points="6 9 12 15 18 9"></polyline>
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
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  
  if (!suggestions || suggestions.length === 0) {
    return (
      <section className="results" style={{ display: "flex", justifyContent: "center", padding: "6rem 2rem" }}>
        <div className="empty-state-card">
          <EmptyIcon />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
            No matches found
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "24px", lineHeight: 1.5 }}>
            Looks like you haven't uploaded a resume yet or your session expired.
          </p>
          <button className="btn-primary" onClick={onReset} style={{ width: "100%", justifyContent: "center" }}>
            Upload Resume
          </button>
        </div>
      </section>
    );
  }

  const top3 = suggestions.slice(0, 3);

  return (
    <section className="results">
      <div className="results-head">
        <div>
          <h2 className="results-title">Your Techfit matches</h2>
          <p className="results-sub">
            Based on your resume, here are the tech roles that best align with your skills and experience.
          </p>
        </div>
        <button className="btn-ghost" onClick={onReset} style={{ height: "fit-content" }}>
          <IcoRefresh /> Match another resume
        </button>
      </div>

      <div className="cards-row">
        {top3.map((s, i) => {
          const RankIcon = RANKS[i].icon;
          const isExpanded = expandedCards[i];
          return (
            <div key={i} className={`match-card podium-card-${i + 1}`}>
              {i === 0 && <div className="top-pill">Best Match</div>}
              <div className="match-rank-label" style={{ color: RANKS[i].color }}><RankIcon /> {RANKS[i].label}</div>
              <div className="match-title">{s.job_title}</div>
              <div className="match-score" style={{ color: RANKS[i].color }}>
                {s.confidence}<span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)" }}>%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${s.confidence}%`, background: RANKS[i].bar }} />
              </div>
              <div className="bar-label">Confidence score</div>
              <button className={`desc-toggle-btn ${isExpanded ? "active" : ""}`} onClick={() => toggleExpand(i)}>
                {isExpanded ? "Hide Description" : "View Description"}
                <IcoChevron open={isExpanded} />
              </button>
              <div className={`desc-wrapper ${isExpanded ? "open" : ""}`}>
                <div className="desc-inner">
                  <p className="desc-text">{s.job_description || "No description available for this role."}</p>
                </div>
              </div>
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
    </section>
  );
}