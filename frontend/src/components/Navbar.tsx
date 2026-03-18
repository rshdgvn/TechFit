import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IcoMoon, IcoSun, IcoMenu, IcoClose } from "./Icons";
import "../css/Navbar.css";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setIsMenuOpen(false);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 768) setIsMenuOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { closeMenu(); }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/purpose", label: "Purpose" },
    { to: "/features", label: "Features" },
  ];

  return (
    <div className={`navbar-wrap${scrolled ? " scrolled" : ""}`}>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* ── Left: Logo + links ── */}
          <div className="navbar-left">
            <Link to="/" className="logo-link" onClick={closeMenu}>
              <img src="/icon.svg" alt="Techfit" className="logo-img" />
              <span className="logo-text">Techfit</span>
            </Link>

            <div className="nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-item${location.pathname === link.to ? " active" : ""}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Right: CTAs + theme ── */}
          <div className="navbar-right">
            <button className="theme-btn desktop-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="btn-icon-wrap">
                {theme === "light" ? <IcoMoon /> : <IcoSun />}
              </span>
            </button>

            <button className="nav-btn-ghost" onClick={() => navigate("/upload?mode=manual")}>
              No resume?
            </button>

            <button className="nav-btn-primary" onClick={() => navigate("/upload")}>
              Get Matched
            </button>

            <button
              className="theme-btn mobile-menu-btn"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="btn-icon-wrap">
                {isMenuOpen ? <IcoClose /> : <IcoMenu />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile dropdown — outside pill, below it ── */}
      <div className={`mobile-dropdown${isMenuOpen ? " open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`mobile-nav-item${location.pathname === link.to ? " active" : ""}`}
            onClick={closeMenu}
          >
            {link.label}
          </Link>
        ))}

        {/* CTAs visible in mobile */}
        <div className="mobile-nav-ctas">
          <button className="nav-btn-ghost mobile-w-full"
            onClick={() => { navigate("/upload?mode=manual"); closeMenu(); }}>
            No resume?
          </button>
          <button className="nav-btn-primary mobile-w-full"
            onClick={() => { navigate("/upload"); closeMenu(); }}>
            Get Matched
          </button>
        </div>

        <button className="mobile-nav-item mobile-theme-toggle" onClick={toggleTheme}>
          <span>Switch to {theme === "light" ? "dark" : "light"} mode</span>
          {theme === "light" ? <IcoMoon /> : <IcoSun />}
        </button>
      </div>
    </div>
  );
}