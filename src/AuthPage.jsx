import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCheck, ShieldCheck } from "lucide-react";

// ✅ 1. Accept 'setUser' as a prop from App.jsx
export function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Login Logic Helper ---
  const performLogin = (roleName) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // ✅ 2. Update the Global User State
      // This tells App.jsx and Navbar that we are logged in
      if (setUser) {
        setUser({ name: "Ali Bin Abu", role: roleName });
      }
      
      // ✅ 3. Redirect to Dashboard
      navigate("/audit");
    }, 800);
  };

  // --- Handlers ---

  const handleLogin = (e) => {
    e.preventDefault();
    // Normal login pretends to be a standard officer
    performLogin("Shariah Officer");
  };

  const handleDemoLogin = () => {
    // Fill the inputs visually
    setEmail("auditor@shariahquest.com");
    setPassword("password123");
    
    // Demo login acts as a Senior Auditor
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

        <div className="divider">
          <span>OR</span>
        </div>

        {/* This is the "Dummy" Button for Judges */}
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
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Work Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" className="btn-primary full-width">Register</button>
        </form>
      </div>
    </div>
  );
}