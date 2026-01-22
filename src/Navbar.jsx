import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, User, LogOut } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); 
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <ShieldCheck size={28} />
          <span>ShariahQuest</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          
          {/* ✅ RESTORED & SMART: Only show Audit if user is logged in */}
          {user && (
            <Link to="/audit" style={{ color: '#047857', fontWeight: '700' }}>
              Audit
            </Link>
          )}

          <Link to="/learn">Learn</Link>
          <Link to="/connect">Connect</Link>
        </div>

        <div className="nav-actions">
          {user ? (
            /* --- LOGGED IN VIEW --- */
            <div className="user-menu" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#1e293b" }}>
                  Salam, {user.name}
                </span>
                <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                  {user.role}
                </span>
              </div>
              
              <div className="avatar-circle">
                <User size={20} color="white" />
              </div>

              <button onClick={handleLogoutClick} className="btn-icon" title="Sign Out">
                <LogOut size={20} color="#64748b" />
              </button>
            </div>
          ) : (
            /* --- GUEST VIEW --- */
            <>
              <Link to="/login" className="btn-text">Sign In</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}