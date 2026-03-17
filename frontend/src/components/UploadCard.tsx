import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IcoAlert, IcoFile, IcoScan, IcoUpload } from "./Icons";
import "../css/UploadCard.css"; 

interface UploadCardProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

export default function UploadCard({ file, onFileSelect, onAnalyze, loading, error }: UploadCardProps) {
  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      onFileSelect(accepted[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
    maxFiles: 1,
  });

  return (
    <div className="hero-right" style={{ animation: "fadeUp 0.55s 0.1s both" }}>
      <div className="upload-card">
        <p className="card-label">Upload your resume</p>

        <div {...getRootProps()} className={`dz${isDragActive ? " active" : ""}`}>
          <input {...getInputProps()} />
          <div className="dz-icon">
            <IcoUpload />
          </div>
          <p style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)", marginBottom: 4 }}>
            {isDragActive ? "Release to upload" : "Drag & drop your resume here"}
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            or <span style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>browse files</span>
            &nbsp;· PDF, TXT, or Markdown
          </p>
        </div>

        {file && (
          <div className="file-pill">
            <div className="file-ico">
              <IcoFile />
            </div>
            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 500 }}>
              {file.name}
            </span>
            <button className="btn-primary" onClick={onAnalyze} disabled={loading}>
              {loading ? (
                <>
                  <div className="spin" style={{ width: 13, height: 13, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                  Analyzing…
                </>
              ) : (
                <>
                  <IcoScan /> Analyze
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="error-box">
            <span style={{ marginTop: 1, flexShrink: 0 }}>
              <IcoAlert />
            </span>
            <span>{error}</span>
          </div>
        )}
      </div>

      <p style={{ textAlign: "center", fontSize: "0.74rem", color: "var(--text-muted)", marginTop: 12 }}>
        Supports English Resumes · Instant tech role matching 
      </p>
    </div>
  );
}