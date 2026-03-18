import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import UploadCard from "../components/UploadCard";
import "../css/UploadPage.css";

const IcoUpload = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const IcoPen = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

const IcoBack = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IcoCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface UploadPageProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

export default function UploadPage({
  file, onFileSelect, onClearFile, onAnalyze, loading, error,
}: UploadPageProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"upload" | "manual">(
    searchParams.get("mode") === "manual" ? "manual" : "upload"
  );

  useEffect(() => {
    setMode(searchParams.get("mode") === "manual" ? "manual" : "upload");
  }, [searchParams]);

  return (
    <div className="upload-page">
      <div className="upload-page-inner" style={{ animation: "fadeUp 0.4s both" }}>

        <button className="upload-back-btn" onClick={() => navigate("/")}>
          <IcoBack /> Back
        </button>

        <p className="upload-eyebrow">
          {mode === "upload" ? "Techfit Analysis" : "Manual Entry"}
        </p>
        <h1 className="upload-title">
          {mode === "upload"
            ? "Find where you truly fit"
            : "Build your tech profile"}
        </h1>
        <p className="upload-sub">
          {mode === "upload"
            ? "Drop your resume below and get matched to the roles that suit your skills best."
            : "No resume? Tell us about your skills and we'll find your best fit."}
        </p>

        <div className="upload-mode-tabs">
          <button
            className={`upload-tab${mode === "upload" ? " active" : ""}`}
            onClick={() => setMode("upload")}
          >
            <IcoUpload /> Resume Upload
          </button>
          <button
            className={`upload-tab${mode === "manual" ? " active" : ""}`}
            onClick={() => setMode("manual")}
          >
            <IcoPen /> Manual Entry
          </button>
        </div>

        <div className="upload-content">
          {mode === "upload" ? (
            <UploadCard
              file={file}
              onFileSelect={onFileSelect}
              onClearFile={onClearFile}
              onAnalyze={onAnalyze}
              loading={loading}
              error={error}
            />
          ) : (
            <div className="manual-coming-soon">
              <span className="manual-soon-badge">Coming Soon</span>
              <p className="manual-soon-title">Profile wizard in progress</p>
              <p className="manual-soon-sub">
                We're building a step-by-step wizard to match you without a resume.
                Try uploading in the meantime.
              </p>
              <button className="manual-soon-btn" onClick={() => setMode("upload")}>
                <IcoUpload /> Upload Resume Instead
              </button>
            </div>
          )}
        </div>

        <div className="upload-trust-strip">
          <span className="upload-trust-item"><IcoCheck /> Analyzed locally</span>
          <span className="upload-trust-sep" />
          <span className="upload-trust-item"><IcoCheck /> Under 10 seconds</span>
          <span className="upload-trust-sep" />
          <span className="upload-trust-item"><IcoCheck /> No account needed</span>
        </div>

      </div>
    </div>
  );
}