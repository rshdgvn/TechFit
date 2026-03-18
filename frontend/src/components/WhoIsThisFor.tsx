import "../css/WhoIsThisFor.css";

const IcoGraduate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
    <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IcoCompass = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const IcoArrows = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3l4 4-4 4" />
    <path d="M3 7h18" />
    <path d="M7 21l-4-4 4-4" />
    <path d="M21 17H3" />
  </svg>
);

const audiences = [
  {
    icon: <IcoGraduate />,
    title: "Tech Students",
    description:
      "You're finishing your degree but still unsure which path to take — development, data, security, or something else entirely. Techfit maps your academic background to the roles you're most suited for.",
  },
  {
    icon: <IcoCompass />,
    title: "The Undecided",
    description:
      "You're drawn to the tech industry but you're not sure if it's really for you. Techfit helps you discover where your strengths genuinely fit — before you commit to a direction.",
  },
  {
    icon: <IcoArrows />,
    title: "Career Shifters",
    description:
      "Coming from a non-tech background and considering a transition? Your existing skills may be more transferable than you think. Techfit finds the bridge between where you are and where you could go.",
  },
];

export default function WhoIsThisFor() {
  return (
    <section className="witf-section" id="about">
      <div className="witf-wrapper">

        <div className="witf-header">
          <span className="witf-label">Purpose</span>
          <h2 className="witf-heading">Who Is This For?</h2>
          <p className="witf-subtext">
            Techfit was built for anyone standing at a crossroads in tech —
            whether you're just starting out, second-guessing yourself, or
            looking for a clearer direction.
          </p>
        </div>

        <div className="witf-quote-block">
          <div className="witf-quote-bar" />
          <blockquote className="witf-quote">
            "Not everyone enters the tech industry knowing exactly where they
            belong. Techfit exists to close that gap — giving every aspiring
            tech professional a clear, data-driven answer to the question:{" "}
            <em>what role is actually right for me?</em>"
          </blockquote>
        </div>

        <div className="witf-cards">
          {audiences.map((a) => (
            <div className="witf-card" key={a.title}>
              <div className="witf-card-icon">{a.icon}</div>
              <div className="witf-card-content">
                <h3 className="witf-card-title">{a.title}</h3>
                <p className="witf-card-desc">{a.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}