import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

  const closeMenu = () => setIsMenuOpen(false);
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/icon.svg" alt="Techfit" className="logo-img" />
          <span className="logo-text">Techfit</span>
        </Link>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-item${location.pathname === "/" ? " active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/purpose"
            className={`nav-item${location.pathname === "/purpose" ? " active" : ""}`}
          >
            Purpose
          </Link>
          <Link
            to="/features"
            className={`nav-item${location.pathname === "/coming-soon" ? " active" : ""}`}
          >
            Features
          </Link>
        </div>

        <div className="nav-actions">
          <button
            className="theme-btn desktop-theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="btn-icon-wrap">
              {theme === "light" ? <IcoMoon /> : <IcoSun />}
            </span>
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

      <div className={`mobile-dropdown${isMenuOpen ? " open" : ""}`}>
        <Link
          to="/"
          className={`mobile-nav-item${location.pathname === "/" ? " active" : ""}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/purpose"
          className={`mobile-nav-item${location.pathname === "/purpose" ? " active" : ""}`}
          onClick={closeMenu}
        >
          Purpose
        </Link>
        <Link
          to="/features"
          className={`mobile-nav-item${location.pathname === "/coming-soon" ? " active" : ""}`}
          onClick={closeMenu}
        >
          Features
        </Link>
        <button
          className="mobile-nav-item mobile-theme-toggle"
          onClick={toggleTheme}
        >
          <span>Switch to {theme === "light" ? "dark" : "light"} mode</span>
          {theme === "light" ? <IcoMoon /> : <IcoSun />}
        </button>
      </div>
    </nav>
  );
}
