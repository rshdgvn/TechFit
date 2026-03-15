import { IcoCheck } from "./Icons";

export default function Hero() {
  const trustItems = [
    "Your resume is never saved or stored",
    "Tech role matches in under 10 seconds",
    "No account or email required",
  ];

  return (
    <div style={{ animation: "fadeUp 0.55s both" }}>
      <h1 className="hero-h1">
        Find your perfect
        <br />
        role in <em>tech.</em>
      </h1>
      <p className="hero-p">
        Not sure which tech career suits you? Upload your resume and
        TechFit's will analyze your skills and experience — then match
        you to the roles where you'll thrive most.
      </p>

      <div className="trust-list">
        {trustItems.map((text) => (
          <div className="trust-item" key={text}>
            <div className="trust-icon-wrap">
              <IcoCheck />
            </div>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}