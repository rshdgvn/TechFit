import { GoalIcon, CpuIcon, ShieldIcon } from "./Icons";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="tech-separator"></div>

      <div className="about-container">
        
        <div className="about-header">
          <span className="about-pre-title">Under the hood</span>
          <h2 className="about-title">What is Techfit?</h2>
          <p className="about-subtitle">
            The tech industry is vast, and finding exactly where a specific set of skills fits can feel overwhelming. 
            Techfit was engineered to remove the guesswork and bridge the gap between raw experience and the ideal career path.
          </p>
        </div>

        {/* 3. Uniform Grid Cards */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon-box"><GoalIcon /></div>
            <h3 className="about-card-title">The Objective</h3>
            <p className="about-card-body">
              To eliminate the confusion of career transitions by providing instant, data-driven role matching for tech professionals based purely on skills.
            </p>
          </div>
          
          <div className="about-card">
            <div className="about-icon-box"><CpuIcon /></div>
            <h3 className="about-card-title">The Engine</h3>
            <p className="about-card-body">
              Powered by a custom Machine Learning classification model trained on thousands of real-world job descriptions to find the perfect statistical match.
            </p>
          </div>
          
          <div className="about-card">
            <div className="about-icon-box"><ShieldIcon /></div>
            <h3 className="about-card-title">Privacy First</h3>
            <p className="about-card-body">
              Data stays local to the session. Resumes are processed securely in real-time to extract skills, with absolutely nothing saved, stored, or shared.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;