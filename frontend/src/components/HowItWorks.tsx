import { UploadIcon, ProcessIcon, OutputIcon } from "./Icons";
import "../css/HowItWorks.css";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Secure Upload",
      body: "Drop your PDF, TXT, or Markdown resume. Your experience is extracted instantly and processed locally in memory—no account needed.",
      icon: <UploadIcon />,
    },
    {
      num: "02",
      title: "Techfit Analysis",
      body: "Techfit's AI reads your background contextually, mapping out your core technical skills, soft skills, and unique strengths.",
      icon: <ProcessIcon />,
    },
    {
      num: "03",
      title: "The Perfect Match",
      body: "Get a highly accurate, ranked list of tech roles where you'll thrive most, along with clear insights on exactly why you're a fit.",
      icon: <OutputIcon />,
    },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="how-container">
        <div className="how-header">
          <span className="how-pre-title">The Pipeline</span>
          <h2 className="how-title">How it works</h2>
        </div>

        <div className="how-pipeline">
          {steps.map((step, index) => (
            <div className="how-step" key={step.num}>
              <div className="how-node-container">
                <div className="how-node">{step.icon}</div>
                {index !== steps.length - 1 && <div className="how-line"></div>}
              </div>

              <div className="how-content">
                <div className="how-num">{step.num}</div>
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
