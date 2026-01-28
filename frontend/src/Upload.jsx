import { useState } from "react";
import { auditDocs } from "./api";
import { UploadCloud, FileText, Loader2 } from "lucide-react";

export default function Upload({ onResult }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    if (files.length === 0) return alert("Please select a PDF file first.");
    
    setLoading(true);
    // Call the API (connects to FastAPI)
    const result = await auditDocs(files);
    setLoading(false);

    if (result) {
      onResult(result);
    }
  };

  return (
    <div className="upload-container" style={{ textAlign: "center" }}>
      <div 
        className="upload-box" 
        style={{ 
          border: "2px dashed #cbd5e1", 
          borderRadius: "12px", 
          padding: "3rem",
          background: "#f8fafc",
          marginBottom: "2rem",
          cursor: "pointer"
        }}
      >
        <UploadCloud size={48} color="#047857" style={{ marginBottom: "1rem" }} />
        <h3>Drag & Drop your Contracts here</h3>
        <p style={{ color: "#64748b" }}>Supports PDF (Murabaha, Tawarruq Agreements)</p>
        
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          onChange={handleFileChange} 
          style={{ marginTop: "1rem" }}
        />
      </div>

      {files.length > 0 && (
        <div className="file-list" style={{ marginBottom: "1.5rem", textAlign: "left" }}>
          <h4>Selected Files:</h4>
          {files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#047857" }}>
              <FileText size={16} /> {f.name}
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleSubmit} 
        disabled={loading} 
        className="btn-primary" 
        style={{ width: "100%", display: "flex", justifyContent: "center", gap: "10px" }}
      >
        {loading ? <><Loader2 className="spin" /> Analyzing...</> : "🚀 Analyze Contract"}
      </button>

      {/* Simple spin animation style */}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}