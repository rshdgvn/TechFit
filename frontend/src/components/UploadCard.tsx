import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IcoAlert, IcoFile, IcoScan, IcoUpload, IcoX } from "./Icons";
import "../css/UploadCard.css";

interface UploadCardProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClearFile?: () => void;
  onAnalyze: () => void;
  loading: boolean;
  error: string | null;
}

export default function UploadCard({ file, onFileSelect, onClearFile, onAnalyze, loading, error }: UploadCardProps) {
  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) onFileSelect(accepted[0]);
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

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClearFile) onClearFile();
  };

  return (
    <div className="upload-card-wrapper">
      <div className="upload-card-glow" />
      <div className="upload-card">

        <div className="card-top-bar" />

        <div className="card-body">
          <div className="card-header">
            <div>
              <h3 className="card-title">Upload your resume</h3>
              <p className="card-subtitle">PDF, TXT or MD · analyzed in seconds</p>
            </div>
          </div>

          <div className="upload-content-area">
            {!file ? (
              <div {...getRootProps()} className={`dz${isDragActive ? " active" : ""}`}>
                <input {...getInputProps()} />

                <div className="dz-icon-cluster">
                  <div className="dz-icon-inner">
                    <IcoUpload />
                  </div>
                </div>

                <p className="dz-main-text">
                  {isDragActive ? "Drop it here!" : "Click or drag & drop"}
                </p>
                <p className="dz-sub-text">Drop your resume here to get started</p>

                <div className="format-badges">
                  <span className="badge">PDF</span>
                  <span className="badge">TXT</span>
                  <span className="badge">MD</span>
                </div>
              </div>
            ) : (
              <div className="file-pill-container">
                <div className="file-pill">
                  <div className="file-info">
                    <div className="file-ico"><IcoFile /></div>
                    <div className="file-meta">
                      <span className="file-name">{file.name}</span>
                      <span className="file-size">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</span>
                    </div>
                    <button className="remove-file-btn" onClick={handleClear} title="Remove file">
                      <IcoX />
                    </button>
                  </div>
                  <button className="btn-primary w-full" onClick={onAnalyze} disabled={loading}>
                    {loading ? (
                      <>
                        <div className="spin spinner-small" />
                        Analyzing AI Match...
                      </>
                    ) : (
                      <>
                        <IcoScan />
                        Reveal Top Matches
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="error-box">
              <IcoAlert />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}