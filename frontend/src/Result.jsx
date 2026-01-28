import { CheckCircle, AlertTriangle, XCircle, ArrowLeft } from "lucide-react";

export default function Result({ data, onReset }) {
  // Determine color based on score
  const getStatusColor = (score) => {
    if (score >= 85) return "#10b981"; // Green
    if (score >= 50) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  const statusColor = getStatusColor(data.score);

  return (
    <div className="result-container">
      <button onClick={onReset} className="btn-outline" style={{ marginBottom: "1.5rem" }}>
        <ArrowLeft size={16} style={{ verticalAlign: "middle", marginRight: "5px" }}/> 
        Upload New Document
      </button>
      
      {/* Score Header */}
      <div 
        className="score-card" 
        style={{ 
          textAlign: "center", 
          padding: "2rem", 
          background: "#f0fdf4", 
          borderRadius: "12px", 
          marginBottom: "2rem",
          border: `1px solid ${statusColor}`
        }}
      >
        <h2 style={{ color: "#064e3b", margin: 0 }}>Shariah Readiness Score</h2>
        <div style={{ fontSize: "4rem", fontWeight: "bold", color: statusColor }}>
          {data.score}%
        </div>
        <div style={{ fontSize: "1.2rem", fontWeight: "600", color: statusColor }}>
          {data.status}
        </div>
      </div>

      {/* Missing Items Section */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AlertTriangle color="#f59e0b" /> Compliance Gaps
        </h3>
        {data.missing.length === 0 ? (
          <p style={{ color: "#10b981", display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle size={16} /> No critical keywords missing.
          </p>
        ) : (
          <ul style={{ paddingLeft: "20px", color: "#ef4444" }}>
            {data.missing.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* AI Recommendations Section */}
      <div className="card" style={{ background: "#f8fafc" }}>
        <h3>🤖 AI Fiqh Advisor</h3>
        <div style={{ lineHeight: "1.6", color: "#334155" }}>
          {data.recommendations.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}