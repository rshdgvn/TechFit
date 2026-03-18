import { Link } from "react-router-dom";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/icon.svg" alt="Techfit" className="footer-logo-img" />
            <span className="footer-logo-text">Techfit</span>
          </Link>
          <p className="footer-tagline">
            The right tech career for you is already out there maybe you just don't know it yet
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-link-group">
            <span className="footer-link-heading">Product</span>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/purpose" className="footer-link">Purpose</Link>
            <Link to="/features" className="footer-link">Features</Link>
          </div>
          <div className="footer-link-group">
            <span className="footer-link-heading">Info</span>
            <a
              href="#how-it-works"
              className="footer-link"
              onClick={e => {
                e.preventDefault();
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </a>
            <a
              href="#about"
              className="footer-link"
              onClick={e => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </a>
          </div>
        </div>

        <div className="footer-dev-card">
          <div className="footer-dev-badge">
            <div className="footer-dev-info">
              <span className="footer-dev-role">Developed by Rasheed Gavin</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}