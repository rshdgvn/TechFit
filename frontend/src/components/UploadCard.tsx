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
      {!file ? (
        <div {...getRootProps()} className={`upload-box${isDragActive ? " active" : ""}`}>
          <input {...getInputProps()} />
          <div className="upload-box-icon">
            <IcoUpload />
          </div>
          <p className="upload-box-title">
            {isDragActive ? "Drop it here!" : "Drop your resume here"}
          </p>
          <p className="upload-box-sub">PDF, TXT or MD · drag & drop or click to browse</p>
        </div>
      ) : (
        <div className="upload-box upload-box--file">
          <div className="upload-file-row">
            <div className="upload-file-icon"><IcoFile /></div>
            <div className="upload-file-meta">
              <span className="upload-file-name">{file.name}</span>
              <span className="upload-file-size">{(file.size / 1024).toFixed(1)} KB · Ready to analyze</span>
            </div>
            <button className="upload-file-remove" onClick={handleClear} title="Remove">
              <IcoX />
            </button>
          </div>
          <button className="upload-analyze-btn" onClick={onAnalyze} disabled={loading}>
            {loading
              ? <><div className="spin spinner-small" /> Analyzing...</>
              : <><IcoScan /> Reveal Top Matches</>
            }
          </button>
        </div>
      )}

      {error && (
        <div className="upload-error">
          <IcoAlert />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}