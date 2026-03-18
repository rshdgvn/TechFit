import { useState, useRef, useEffect, useCallback } from "react";
import skillsData from "../data/skills.json";
import rolesData from "../data/roles.json";
import softSkillsData from "../data/softSkills.json";
import "../css/ManualEntryCard.css";

const SOFT_SET = new Set(
  (softSkillsData as string[]).map((s) => s.toLowerCase()),
);
const isSoft = (skill: string) => SOFT_SET.has(skill.toLowerCase());
const isCustom = (skill: string, allSkills: string[]) =>
  !allSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase());

const IcoX = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcoSearch = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IcoScan = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IcoPlus = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MIN_SKILLS = 3;
const MAX_SKILLS = 12;
const ALL_SKILLS = skillsData as string[];

interface ManualEntryCardProps {
  onAnalyze: (payload: {
    mode: "manual";
    skills: string[];
    custom_skills: string[];
    interests: string;
  }) => void;
  loading: boolean;
  error: string | null;
}

export default function ManualEntryCard({
  onAnalyze,
  loading,
  error,
}: ManualEntryCardProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [selectedSkills, setSelectedSkills] = useState<string[]>(() => {
    const saved = localStorage.getItem("techfit_manual_skills");
    return saved ? JSON.parse(saved) : [];
  });

  const [interests, setInterests] = useState<string>(() => {
    return localStorage.getItem("techfit_manual_interests") || "";
  });

  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(
      "techfit_manual_skills",
      JSON.stringify(selectedSkills),
    );
  }, [selectedSkills]);

  useEffect(() => {
    localStorage.setItem("techfit_manual_interests", interests);
  }, [interests]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setShowCustomPrompt(false);
      return;
    }

    const filtered = ALL_SKILLS.filter(
      (s) => s.toLowerCase().includes(q) && !selectedSkills.includes(s),
    ).slice(0, 7);

    setSuggestions(filtered);
    setActiveIdx(-1);

    const exactMatch = ALL_SKILLS.some((s) => s.toLowerCase() === q);
    setShowCustomPrompt(!exactMatch && query.trim().length >= 2);
  }, [query, selectedSkills]);

  const addSkill = useCallback(
    (skill: string) => {
      const trimmed = skill.trim();
      if (!trimmed) return;
      if (
        selectedSkills
          .map((s) => s.toLowerCase())
          .includes(trimmed.toLowerCase())
      )
        return;
      if (selectedSkills.length >= MAX_SKILLS) return;
      setSelectedSkills((prev) => [...prev, trimmed]);
      setQuery("");
      setSuggestions([]);
      setShowCustomPrompt(false);
      inputRef.current?.focus();
    },
    [selectedSkills],
  );

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalItems = suggestions.length + (showCustomPrompt ? 1 : 0);
    if (!totalItems) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, totalItems - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && activeIdx < suggestions.length) {
        addSkill(suggestions[activeIdx]);
      } else if (activeIdx === suggestions.length && showCustomPrompt) {
        addSkill(query.trim());
      } else if (showCustomPrompt && suggestions.length === 0) {
        addSkill(query.trim());
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIdx(-1);
    }
  };

  const handleSubmit = () => {
    if (selectedSkills.length === 0) return;
    const customSkills = selectedSkills.filter((s) => isCustom(s, ALL_SKILLS));
    onAnalyze({
      mode: "manual",
      skills: selectedSkills,
      custom_skills: customSkills,
      interests: interests.trim(),
    });
  };

  const getTagType = (skill: string): "soft" | "custom" | "hard" => {
    if (isCustom(skill, ALL_SKILLS)) return "custom";
    if (isSoft(skill)) return "soft";
    return "hard";
  };

  const canSubmit = selectedSkills.length >= MIN_SKILLS && !loading;
  const hasCustom = selectedSkills.some((s) => isCustom(s, ALL_SKILLS));
  const hasSoft = selectedSkills.some((s) => isSoft(s));

  return (
    <div className="manual-card">
      {/* ── Step 1: Skills ── */}
      <div className="manual-section">
        <div className="manual-section-label">
          <span className="manual-step-num">1</span>
          Your skills
          <span className="manual-step-hint">
            Aim for your top 5-8 strongest
          </span>
        </div>

        {/* Tags */}
        {selectedSkills.length > 0 && (
          <div className="manual-tags">
            {selectedSkills.map((skill) => {
              const type = getTagType(skill);
              return (
                <span key={skill} className={`manual-tag manual-tag--${type}`}>
                  {type === "custom" && <span className="tag-custom-dot" />}
                  {skill}
                  <button
                    className="manual-tag-remove"
                    onClick={() => removeSkill(skill)}
                  >
                    <IcoX />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Search */}
        {selectedSkills.length < MAX_SKILLS && (
          <div className="manual-input-wrap">
            <div className={`manual-input-box${focused ? " focused" : ""}`}>
              <IcoSearch />
              <input
                ref={inputRef}
                className="manual-input"
                type="text"
                placeholder="Search or add a skill..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setFocused(false);
                    setSuggestions([]);
                    setShowCustomPrompt(false);
                  }, 160);
                }}
                autoComplete="off"
              />
              {query && (
                <button
                  className="manual-input-clear"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  <IcoX />
                </button>
              )}
            </div>

            {/* Dropdown */}
            {(suggestions.length > 0 || showCustomPrompt) && focused && (
              <div className="manual-suggestions">
                {suggestions.map((s, i) => {
                  const soft = isSoft(s);
                  const roleCount = (
                    rolesData as { title: string; skills: string[] }[]
                  ).filter((r) => r.skills.includes(s)).length;
                  return (
                    <button
                      key={s}
                      className={`manual-suggestion-item${i === activeIdx ? " active" : ""}`}
                      onMouseDown={() => addSkill(s)}
                    >
                      <span className="suggestion-skill-name">{s}</span>
                      <span className="suggestion-right">
                        {soft ? (
                          <span className="suggestion-soft-badge">Soft</span>
                        ) : (
                          <span className="suggestion-roles-count">
                            {roleCount} roles
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}

                {/* Custom skill option */}
                {showCustomPrompt && (
                  <button
                    className={`manual-suggestion-item manual-suggestion-custom${activeIdx === suggestions.length ? " active" : ""}`}
                    onMouseDown={() => addSkill(query.trim())}
                  >
                    <span className="suggestion-custom-wrap">
                      <IcoPlus />
                      <span>
                        Add <strong>"{query.trim()}"</strong> as custom skill
                      </span>
                    </span>
                    <span className="suggestion-custom-badge">Custom</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {selectedSkills.length >= MAX_SKILLS && (
          <p className="manual-limit-note">
            Maximum of {MAX_SKILLS} skills reached.
          </p>
        )}

        {/* Legend — only when tags are visible */}
        {selectedSkills.length > 0 && (
          <div className="manual-tag-legend">
            <span className="legend-item legend-item--hard">Technical</span>
            {hasSoft && (
              <span className="legend-item legend-item--soft">Soft</span>
            )}
            {hasCustom && (
              <span className="legend-item legend-item--custom">Custom</span>
            )}
          </div>
        )}
      </div>

      <div className="manual-section">
        <div className="manual-section-label">
          <span className="manual-step-num">2</span>
          What do you enjoy?
          <span className="manual-step-hint">Optional</span>
        </div>
        <textarea
          className="manual-textarea"
          placeholder="e.g. I love designing, leading teams, solving complex challenges..."
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          rows={3}
          maxLength={300}
        />
        <span className="manual-char-count">{interests.length}/300</span>
      </div>

      <div className="manual-submit-wrapper">
        <button
          className="manual-submit-btn"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          {loading ? (
            <>
              <div className="spin spinner-small" /> Finding your matches...
            </>
          ) : (
            <>
              <IcoScan /> Find My Best Roles
            </>
          )}
        </button>

        {selectedSkills.length > 0 && selectedSkills.length < MIN_SKILLS && (
          <p className="manual-min-warning">
            Please add at least {MIN_SKILLS - selectedSkills.length} more skill
            {MIN_SKILLS - selectedSkills.length > 1 ? "s" : ""} for an accurate
            match.
          </p>
        )}
      </div>

      {error && <div className="manual-error">{error}</div>}
    </div>
  );
}
