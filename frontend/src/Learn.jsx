import { BookOpen, Scale, FileText, Award, ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import "./Learn.css";

export default function Learn() {
  const modules = [
    {
      id: 1,
      title: "Fundamentals of Shariah Audit",
      desc: "Understand the core principles of Usul Fiqh and the role of a Shariah Auditor.",
      icon: <Scale size={32} color="#047857" />,
      level: "Beginner",
      duration: "2 Hours",
      link: "/learn/fundamentals"
    },
    {
      id: 2,
      title: "Commercial Contracts (Fiqh Muamalat)",
      desc: "Deep dive into Murabahah, Ijarah, Wakalah, and Tawarruq structures.",
      icon: <FileText size={32} color="#047857" />,
      level: "Intermediate",
      duration: "4 Hours",
      link: "/learn/contracts"
    },
    {
      id: 3,
      title: "AAOIFI & BNM Governance Standards",
      desc: "Master the regulatory frameworks: SC Malaysia, BNM, and AAOIFI standards.",
      icon: <BookOpen size={32} color="#047857" />,
      level: "Advanced",
      duration: "5 Hours",
      link: "/learn/standards"
    },
    {
      id: 4,
      title: "Sukuk Structuring & Audit",
      desc: "Learn how to audit complex Sukuk issuances and verify asset compliance.",
      icon: <Award size={32} color="#047857" />,
      level: "Expert",
      duration: "3 Hours",
      link: "/learn/sukuk"
    }
  ];

  return (
    <div className="learn-page">
      <div className="learn-header">
        <h1>Shariah Audit Learning Modules</h1>
        <p>Master Islamic Finance auditing with our certified learning modules.</p>
      </div>

      <div className="modules-grid">
        {modules.map((mod) => (
          <div key={mod.id} className="module-card">
            <div className="icon-wrapper">
              {mod.icon}
            </div>
            <div className="module-content">
              <h3>{mod.title}</h3>
              <p>{mod.desc}</p>
              
              <div className="meta-tags">
                <span className="badge level">{mod.level}</span>
                <span className="badge duration"><PlayCircle size={12} /> {mod.duration}</span>
              </div>

              <Link to={mod.link} className="btn-start">
                Start Module <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Call to Action for Certification */}
      <div className="certification-banner">
        <div className="cert-text">
          <h2>Ready to get certified?</h2>
          <p>Complete all modules to take the Final Shariah Auditor Exam.</p>
        </div>
        <button className="btn-certify">View Exam Details</button>
      </div>
    </div>
  );
}