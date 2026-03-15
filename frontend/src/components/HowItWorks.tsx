import { UploadIcon, ProcessIcon, OutputIcon } from "./Icons";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Input & Parse",
      body: "Drop your PDF, TXT, or Markdown resume. The parser instantly extracts your raw text and experience without requiring an account.",
      icon: <UploadIcon />
    },
    {
      num: "02",
      title: "Feature Extraction",
      body: "The model scans the raw text, filtering out noise and isolating the exact technical skills, tools, and frameworks you actually know.",
      icon: <ProcessIcon />
    },
    {
      num: "03",
      title: "Statistical Match",
      body: "Your skill matrix is run through the classification engine, outputting a ranked list of tech careers mathematically aligned with your profile.",
      icon: <OutputIcon />
    }
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
                <div className="how-node">
                  {step.icon}
                </div>
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