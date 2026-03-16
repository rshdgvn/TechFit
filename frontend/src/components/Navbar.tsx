import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IcoMoon, IcoSun, IcoMenu, IcoClose } from "./Icons";
import "../css/Navbar.css";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 650 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src="/icon.svg" alt="Techfit Logo" className="logo-img" />
          <span className="logo-text">Techfit</span>
        </Link>

        <div className="navbar-right">
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/coming-soon" className="nav-item">Coming Soon</Link>
          </div>
          
          <div className="nav-actions">
            <button className="theme-btn desktop-theme-btn" onClick={toggleTheme}>
              {theme === "light" ? <IcoMoon /> : <IcoSun />}
            </button>

            <button className="theme-btn mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <IcoClose /> : <IcoMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-dropdown ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="mobile-nav-item" onClick={closeMenu}>Home</Link>
        <Link to="/coming-soon" className="mobile-nav-item" onClick={closeMenu}>Coming Soon</Link>
        
        <button className="mobile-nav-item mobile-theme-toggle" onClick={toggleTheme}>
          <span>Switch Theme</span>
          {theme === "light" ? <IcoMoon /> : <IcoSun />}
        </button>
      </div>
    </nav>
  );
}