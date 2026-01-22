import { useState } from "react";
import { auditDocs } from "./api"; 
import { Upload, Loader2, FileText, ChevronDown, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";

export default function AuditRow({ title, description, savedData, onUpdate }) {
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [expanded, setExpanded] = useState(false);

  // ✅ Extracting both status and readiness from the new data object
  const status = savedData?.status || "Not Started";
  const readiness = savedData?.readiness || 0;

  const handleManualStatusChange = (e) => {
    // If manually changed, we default readiness to 100 for 'Completed' or 0 otherwise
    const newStatus = e.target.value;
    const newReadiness = (newStatus === "Completed" || newStatus === "Compliant") ? 100 : 0;
    onUpdate(newStatus, newReadiness);
  };

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    onUpdate("Analyzing", 0); 
    setExpanded(true); 

    try {
      const result = await auditDocs([selectedFile]); 

      if (result) {
        // Readiness logic based on AI score (e.g., 85)
        const score = result.score || 0;
        const newStatus = score > 80 ? "Compliant" : "Issues";
        
        onUpdate(newStatus, score);
        setFeedback(result.recommendations);
      } else {
        onUpdate("In Progress", 50); 
      }
    } catch (error) {
      console.error("Audit failed", error);
      onUpdate("In Progress", 30);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "Compliant": return "badge-green"; 
      case "Completed": return "badge-green"; 
      case "Issues": return "badge-red";      
      case "Analyzing": return "badge-blue";  
      default: return "badge-gray";
    }
  };

  return (
    <div className={`audit-row ${status === "Compliant" ? "border-green-500" : "border-gray-200"}`}>
      <div className="row-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        <div className="row-info" style={{ flex: 1 }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#64748b" }}>{description}</p>
        </div>

        {/* ✅ NEW: READINESS PROGRESS MINI-BAR */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {status !== "Not Started" && (
            <div className="readiness-box" style={{ width: "100px", textAlign: "right" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: "bold", color: "#047857" }}>{readiness}% Ready</span>
              <div style={{ height: "4px", background: "#e2e8f0", borderRadius: "2px", marginTop: "4px" }}>
                <div style={{ height: "100%", background: "#10b981", width: `${readiness}%`, borderRadius: "2px", transition: "width 0.5s ease" }}></div>
              </div>
            </div>
          )}

          <div className="row-actions">
            <div className={`status-select-wrapper ${getStatusColor()}`}>
              {status === "Analyzing" ? (
                <div className="analyzing-text"><Loader2 className="spin" size={12} /> Analyzing...</div>
              ) : (
                <>
                  <select value={status} onChange={handleManualStatusChange} className="status-select">
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Compliant" disabled>✨ AI Compliant</option>
                    <option value="Issues" disabled>⚠️ AI Issues</option>
                  </select>
                  <ChevronDown size={14} className="select-icon" />
                </>
              )}
            </div>

            {file ? (
              <div className="file-group">
                <button className="btn-file" onClick={() => setExpanded(!expanded)}>
                  <FileText size={16} /> {file.name.substring(0, 8)}...
                </button>
                <label className="btn-reupload">
                  <RefreshCw size={14} />
                  <input type="file" hidden accept=".pdf" onChange={handleUpload} />
                </label>
              </div>
            ) : (
              <label className="btn-upload">
                <Upload size={16} /> Upload
                <input type="file" hidden accept=".pdf" onChange={handleUpload} />
              </label>
            )}
          </div>
        </div>
      </div>

      {(expanded || (feedback && status !== "Analyzing")) && (
        <div className="row-details">
          {status === "Analyzing" && <p className="ai-loading">🤖 AI is scanning for SC Malaysia compliance risks...</p>}
          {feedback && (
            <div className="ai-response">
              <h4>🎯 AI Readiness Analysis:</h4>
              <div className="ai-text">
                {feedback.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}