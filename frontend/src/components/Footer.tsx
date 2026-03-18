import { Link } from "react-router-dom";
import "../css/Footer.css";

const IcoGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const IcoLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const IcoFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Footer() {
  const socials = [
    { icon: <IcoGithub />, label: "GitHub", href: "https://github.com/rshdgvn" },
    { icon: <IcoLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/rasheed-gavin-65332a349" },
    { icon: <IcoFacebook />, label: "Facebook", href: "https://www.facebook.com/rasheed.gavin31" },
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ── Brand ── */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/icon.svg" alt="Techfit" className="footer-logo-img" />
            <span className="footer-logo-text">Techfit</span>
          </Link>
          <p className="footer-tagline">
            Discover the tech career you didn't know existed, but is a perfect fit for you.
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
            <a href="#how-it-works" className="footer-link"
              onClick={e => { e.preventDefault(); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}>
              How It Works
            </a>
            <a href="#about" className="footer-link"
              onClick={e => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>
              About
            </a>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="footer-cta">
          <p className="footer-cta-text">Ready to find your fit?</p>
          <Link to="/upload" className="footer-cta-btn">Get Matched →</Link>

        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <div className="footer-dev">
            <div className="footer-dev-info">
              <span className="footer-dev-name">Developed by Rasheed Gavin</span>
              <span className="footer-dev-role">Aspiring Software & AI/ML Engineer</span>
            </div>
          </div>
        </div>


        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="footer-social-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}