export default function HowItWorks() {
  const steps = [
    ["01", "Upload your resume", "Drop your PDF, TXT, or Markdown resume. No account needed — the whole process takes under a minute."],
    ["02", "TechFit reads your profile", "TechFit parses your technical skills, experience, projects, and background to understand where your strengths lie."],
    ["03", "Get your tech role matches", "Receive a ranked list of tech careers most aligned with your profile — from software engineering to product design and beyond."],
  ];

  return (
    <section className="how">
      <div className="how-inner">
        <h2 className="section-title">How it works</h2>
        <div className="how-grid">
          {steps.map(([n, t, b]) => (
            <div className="how-card" key={n}>
              <div className="how-num">{n}</div>
              <div className="how-card-title">{t}</div>
              <div className="how-card-body">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}