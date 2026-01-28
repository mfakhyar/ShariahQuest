import { useNavigate } from "react-router-dom";
import { UserCheck, Star, ArrowRight } from "lucide-react";
import "./Connect.css"; // We will create this simple CSS below

export default function Connect() {
  const navigate = useNavigate();

  const advisors = [
    { id: 1, name: "Dr. Abdullah", role: "Certified Shariah Auditor", special: "Sukuk & Fintech", rating: "4.9" },
    { id: 2, name: "Sheikh Omar", role: "Muamalat Expert", special: "Banking & Takaful", rating: "4.8" },
    { id: 3, name: "Ustazah Sarah", role: "Legal Consultant", special: "Contract Law", rating: "5.0" },
  ];

  const handleBook = (advisor) => {
    // Navigate to the Consultation Room and pass the advisor's details
    navigate("/consultation", { state: { advisor } });
  };

  return (
    <div className="connect-page">
      <div className="connect-header">
        <h1>Shariah Advisory Network</h1>
        <p>Connect with certified experts for real-time validation and guidance.</p>
      </div>

      <div className="advisors-grid">
        {advisors.map((advisor) => (
          <div key={advisor.id} className="advisor-card">
            <div className="advisor-avatar">
              <UserCheck size={32} color="#047857" />
            </div>
            <h3>{advisor.name}</h3>
            <span className="role">{advisor.role}</span>
            <div className="tags">
              <span className="tag">{advisor.special}</span>
            </div>
            <div className="rating">
              <Star size={14} fill="#fbbf24" stroke="none" /> {advisor.rating} / 5.0
            </div>
            
            <button className="btn-book" onClick={() => handleBook(advisor)}>
              Book Consultation <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}