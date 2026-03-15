import { goals } from "../constants/goals";

const ComingSoon = () => {
  return (
    <section className="coming-soon-section" id="coming-soon">
      <div className="cs-inner">
        <div className="cs-header">
          <h2 className="cs-title">Coming Soon</h2>
          <p className="cs-subtitle">
            Here’s what Techfit is building next to help you navigate your tech career.
          </p>
        </div>

        <div className="cs-timeline">
          {goals.map((goal) => (
            <div key={goal.id} className="cs-timeline-item">
              <div className="cs-timeline-marker">
                <div className="cs-marker-dot"></div>
                <div className="cs-marker-line"></div>
              </div>
              
              <div className="cs-timeline-content">
                <span className="cs-badge">{goal.badge}</span>
                <h3 className="cs-item-title">{goal.title}</h3>
                <p className="cs-item-desc">{goal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;