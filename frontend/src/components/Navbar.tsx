import React from "react";
import { IcoMoon, IcoSun } from "./Icons";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        
        <a href="#" className="logo-link">
          <img
            src="/icon.svg"
            alt="TechFit Logo"
            className="logo-img"
          />
          <span className="logo-text">TechFit</span>
        </a>

        <div className="navbar-right">
          <div className="nav-links">
            <a href="#about" className="nav-item">About</a>
            <a href="#how-it-works" className="nav-item">Pipeline</a>
            <a href="#coming-soon" className="nav-item">Coming Soon</a>
          </div>
          
          <button
            className="theme-btn"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <IcoMoon /> : <IcoSun />}
          </button>
        </div>

      </div>
    </nav>
  );
}