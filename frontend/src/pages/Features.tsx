import "../css/Features.css";

const IcoZap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IcoMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const IcoShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const IcoUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IcoFile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="13" y2="17" />
  </svg>
);

const IcoRocket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const IcoStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function Features() {
  return (
    <section className="feat-section" id="features">
      <div className="feat-wrapper">

        {/* ── Header ── */}
        <div className="feat-header">
          <span className="feat-label">Features</span>
          <h2 className="feat-heading">Everything you need to find your fit.</h2>
          <p className="feat-subtext">
            Built lean, fast, and private — no fluff, just the tools
            that get you to your answer.
          </p>
        </div>

        {/* ── Bento grid ── */}
        <div className="feat-bento">

          {/* Card 1 — Large: Fast analysis (spans 2 cols) */}
          <div className="feat-card feat-card--wide feat-card--accent">
            <div className="feat-card-icon feat-card-icon--light">
              <IcoZap />
            </div>
            <div className="feat-card-body">
              <h3 className="feat-card-title">Results in under 10 seconds</h3>
              <p className="feat-card-desc">
                Upload your resume and get a full career match breakdown in seconds —
                no waiting, no queues. Techfit's analysis is instant and runs entirely
                without sending your data anywhere.
              </p>
            </div>
            <div className="feat-card-stat">
              <span className="feat-stat-number">10s</span>
              <span className="feat-stat-label">avg. analysis time</span>
            </div>
          </div>

          {/* Card 2 — Roles mapped */}
          <div className="feat-card feat-card--tall">
            <div className="feat-card-icon">
              <IcoMap />
            </div>
            <h3 className="feat-card-title">289+ tech roles mapped</h3>
            <p className="feat-card-desc">
              From frontend dev to ML engineer, cloud architect to UX researcher —
              Techfit covers the full spectrum of tech careers.
            </p>
            <div className="feat-pill-row">
              <span className="feat-pill">Frontend</span>
              <span className="feat-pill">DevOps</span>
              <span className="feat-pill">Data Science</span>
              <span className="feat-pill">Security</span>
              <span className="feat-pill">+285 more</span>
            </div>
          </div>

          {/* Card 3 — No account */}
          <div className="feat-card">
            <div className="feat-card-icon">
              <IcoUser />
            </div>
            <h3 className="feat-card-title">No account required</h3>
            <p className="feat-card-desc">
              Just upload and go. No sign-ups, no emails, no friction.
            </p>
          </div>

          {/* Card 4 — Resume never stored */}
          <div className="feat-card">
            <div className="feat-card-icon">
              <IcoShield />
            </div>
            <h3 className="feat-card-title">Resume never stored</h3>
            <p className="feat-card-desc">
              Your file is analyzed locally and discarded immediately.
              Nothing is saved, logged, or shared.
            </p>
          </div>

          {/* Card 5 — File formats */}
          <div className="feat-card">
            <div className="feat-card-icon">
              <IcoFile />
            </div>
            <h3 className="feat-card-title">No resume? No problem.</h3>
            <p className="feat-card-desc">
              Don't have a resume yet? Use manual entry to describe your
              skills and experience instead — Techfit works either way.
            </p>
          </div>

          {/* Card 6 — Coming Soon (spans 2 cols) */}
          <div className="feat-card feat-card--wide feat-card--coming-soon">
            <div className="feat-coming-soon-badge">
              <IcoRocket />
              Coming Soon
            </div>
            <h3 className="feat-card-title">More powerful features on the way</h3>
            <p className="feat-card-desc">
              We're building deeper tools to help you grow — not just find a role, but own it.
            </p>
            <div className="feat-roadmap-items">
              <div className="feat-roadmap-item">
                <IcoStar />
                <span>Skill Gap Analysis</span>
              </div>
              <div className="feat-roadmap-item">
                <IcoStar />
                <span>Personalized Learning Roadmaps</span>
              </div>
              <div className="feat-roadmap-item">
                <IcoStar />
                <span>Role Comparison Tool</span>
              </div>
              <div className="feat-roadmap-item">
                <IcoStar />
                <span>Resume Improvement Tips</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}