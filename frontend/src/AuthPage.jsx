import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { UserCheck, ShieldCheck } from "lucide-react";
import "./AuthPage.css";

export function Login({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Smart Redirect: Go back to where they came from, or default to Audit
  const from = location.state?.from?.pathname || "/audit";

  const performLogin = (roleName) => {
    setIsLoading(true);
    setTimeout(() => {
      if (setUser) {
        setUser({ name: "Ali Bin Abu", role: roleName });
      }
      navigate(from, { replace: true });
    }, 800);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    performLogin("Shariah Officer");
  };

  // ✅ RESTORED: Demo Login Handler
  const handleDemoLogin = () => {
    setEmail("auditor@shariahquest.com");
    setPassword("password123");
    performLogin("Senior Auditor");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <ShieldCheck size={40} color="#047857" />
          <h2>ShariahQuest</h2>
        </div>
        
        <h3 className="auth-title">Auditor Sign In</h3>
        <p className="auth-subtitle">Access your secure compliance workbench.</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary full-width" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* ✅ RESTORED: Divider & Demo Button */}
        <div className="divider">
          <span>OR</span>
        </div>

        <button className="btn-outline full-width demo-btn" onClick={handleDemoLogin}>
          <UserCheck size={18} /> 
          Auto-Fill Demo Account
        </button>

      </div>
    </div>
  );
}

export function Register() {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Join the ShariahQuest compliance network.</p>
        <form onSubmit={(e) => { e.preventDefault(); navigate("/login"); }}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Work Email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn-primary full-width">Register</button>
        </form>
      </div>
    </div>
  );
}