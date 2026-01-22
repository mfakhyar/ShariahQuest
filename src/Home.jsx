// src/Home.jsx
import { Link } from "react-router-dom";
import { ShieldCheck, BookOpen, Users, FileCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Your <span className="highlight">Shariah Audit</span> Hub</h1>
        <p>Streamlined tools for Murabaha compliance, Fiqh validation, and audit readiness.</p>
        <div className="hero-buttons">
          <Link to="/audit" className="btn-primary">Start New Audit</Link>
          <Link to="/learn" className="btn-outline">Learn Fiqh</Link>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="features-grid">
        <Link to="/audit" className="feature-card">
          <div className="icon-bg green"><ShieldCheck size={32} /></div>
          <h3>Start Audit</h3>
          <p>Analyze contracts for Riba & Gharar risks.</p>
        </Link>
        
        <Link to="/learn" className="feature-card">
          <div className="icon-bg blue"><BookOpen size={32} /></div>
          <h3>Learn</h3>
          <p>Master Fiqh Mu'amalat standards.</p>
        </Link>

        <Link to="/connect" className="feature-card">
          <div className="icon-bg gold"><Users size={32} /></div>
          <h3>Connect</h3>
          <p>Consult Shariah Advisors instantly.</p>
        </Link>

        <Link to="/files" className="feature-card">
          <div className="icon-bg purple"><FileCheck size={32} /></div>
          <h3>Attachments</h3>
          <p>Manage your fatwas and agreements.</p>
        </Link>
      </section>
    </div>
  );
}