import { IcoMoon, IcoSun } from "./Icons";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <img
            src="/icon.svg"
            alt="TechFit Logo"
            className="h-10 w-10"
          />
          <span>TechFit</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            Tech Career Matching
          </span>
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
