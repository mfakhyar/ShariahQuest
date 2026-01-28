import { useState } from "react";
import AuditRow from "./AuditRow";
import { ChevronDown, Download, CheckCircle, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("Stock Screening (SC Malaysia)");
  
  // ✅ UPDATED: State stores both status and readiness percentage
  const [auditDetails, setAuditDetails] = useState({});

  const categories = [
    "Banking Operations (BNM)",
    "Stock Screening (SC Malaysia)",
    "Takaful Operations",
    "Governance & IFSA"
  ];

  const auditData = {
    "Banking Operations (BNM)": [
      { title: "Murabahah: Asset Possession", description: "Verify Bank's legal ownership of asset before sale per BNM Resolutions." },
      { title: "Tawarruq: Execution Sequence", description: "Audit 'Tartib' timestamps: Purchase -> Sale to Customer -> Sale to Third Party." },
      { title: "Ijarah: Maintenance Responsibility", description: "Ensure structural maintenance costs are borne by the Lessor (Bank)." },
      { title: "Musharakah: Loss Allocation", description: "Verify losses are shared strictly according to capital contribution." },
      { title: "Qard: Late Payment (Ta'widh)", description: "Confirm charges are based on actual cost, not compound interest." }
    ],
    "Stock Screening (SC Malaysia)": [
      { title: "Audited Financial Statements", description: "Submit latest 3 years of audited reports for 33% Debt & Cash ratio verification." },
      { title: "Detailed Revenue & PBT Breakdown", description: "Provide granular income sources to identify non-halal contributions (< 5% threshold)." },
      { title: "Principal Business Activities", description: "Submit detailed business description for Qualitative Screening (e.g., Banking, Gaming)." },
      { title: "Shariah Adviser’s Report", description: "Upload the formal certification letter from a registered Shariah Adviser." },
      { title: "Statutory Declaration by Directors", description: "Provide signed declaration confirming the accuracy of financial and Shariah data." },
      { title: "Prospectus / Information Memo", description: "Submit text-searchable PDF version of the offer document or prospectus." }
    ],
    "Takaful Operations": [
      { title: "Tabarru' Fund Separation", description: "Ensure participant funds are legally distinct from shareholder funds (IFSA 2013)." },
      { title: "Re-Takaful Necessity Check", description: "Verify Shariah Committee approval for using conventional re-insurance." },
      { title: "Wakalah Fee Disclosure", description: "Check if upfront fees are clearly disclosed in the Product Disclosure Sheet." }
    ],
    "Governance & IFSA": [
      { title: "SGP 2019 Independence", description: "Audit the reporting line from Shariah Committee directly to the Board." },
      { title: "SC/Board Oversight", description: "Verify Board has reviewed the Shariah non-compliance report for the year." },
      { title: "Professional Competency", description: "Confirm Shariah auditors have required Fiqh Muamalat certifications." }
    ]
  };

  const currentItems = auditData[selectedCategory];

  // --- PROGRESS CALCULATION ---
  const totalItems = currentItems.length;
  const completedItems = currentItems.filter(item => {
    const details = auditDetails[`${selectedCategory}-${item.title}`];
    return details && ["Compliant", "Issues", "Completed"].includes(details.status);
  }).length;

  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  // ✅ UPDATED HANDLER: Receives status and readiness
  const handleUpdate = (title, status, readiness) => {
    setAuditDetails(prev => ({
      ...prev,
      [`${selectedCategory}-${title}`]: { status, readiness }
    }));
  };

  const handleGenerateReport = () => {
    if (progressPercentage < 100) {
      alert(`⚠️ Audit Incomplete: Only ${progressPercentage}% finished.\nPlease verify all documents to 100% readiness.`);
      return;
    }
    alert(`📄 Generating Specialized Audit Report...\n\n✅ Verified against SC Malaysia Submission Guidelines.`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-flex">
        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
          <ShieldCheck size={28} color="#047857" />
          <div>
            <h2 style={{margin: 0}}>Audit Workbench</h2>
            <p style={{color: "#64748b", margin: 0, fontSize: "0.85rem"}}>Type: <strong>SC Malaysia Compliance Submission</strong></p>
          </div>
        </div>

        <div className="header-actions-row">
          <div className="category-selector">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="dropdown-select"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown className="dropdown-icon" size={16}/>
          </div>
          
          <button 
            className={progressPercentage === 100 ? "btn-primary" : "btn-outline"}
            style={progressPercentage === 100 ? {background: "#047857", color: "white"} : {background: "white"}}
            onClick={handleGenerateReport}
          >
            {progressPercentage === 100 ? <CheckCircle size={18} style={{marginRight: "8px"}}/> : <Download size={18} style={{marginRight: "8px"}}/>}
            {progressPercentage === 100 ? "Ready for Submission" : "Generate Report"}
          </button>
        </div>
      </div>

      <div className="card progress-card" style={{marginBottom: "2rem"}}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
          <h3>Overall Submission Readiness: {selectedCategory}</h3>
          <span className={progressPercentage === 100 ? "badge-green-label" : "badge-gray"}>
            {progressPercentage}% Verified
          </span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{
              width: `${progressPercentage}%`,
              background: progressPercentage === 100 ? "#10b981" : "#047857"
            }}
          ></div>
        </div>
      </div>

      <div className="checklist-container animated-fade">
        <div className="checklist-section">
          {currentItems.map((item) => (
            <AuditRow 
              key={`${selectedCategory}-${item.title}`} 
              title={item.title} 
              description={item.description}
              // ✅ Passing combined data object
              savedData={auditDetails[`${selectedCategory}-${item.title}`]}
              onUpdate={(status, readiness) => handleUpdate(item.title, status, readiness)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}