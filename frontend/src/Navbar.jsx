import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, User, LogOut } from "lucide-react";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout(); 
    navigate("/"); 
  };

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path + "/");
    return {
      color: isActive ? '#047857' : '#64748b',
      fontWeight: isActive ? '700' : '500',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    };
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <ShieldCheck size={28} />
          <span>ShariahQuest</span>
        </Link>

        <div className="nav-links">
          <Link to="/" style={getLinkStyle("/")}>
            Home
          </Link>
          
          {/* ✅ LOGGED IN LINKS */}
          {user && (
            <>
              <Link to="/audit" style={getLinkStyle("/audit")}>
                Audit
              </Link>
              <Link to="/attachments" style={getLinkStyle("/attachments")}>
                Attachments
              </Link>
              {/* Moved Learn Here */}
              <Link to="/learn" style={getLinkStyle("/learn")}>
                Learn
              </Link>
            </>
          )}

          <Link to="/connect" style={getLinkStyle("/connect")}>
            Connect
          </Link>
        </div>

        <div className="nav-actions">
          {user ? (
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