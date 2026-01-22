// src/App.jsx
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { Login, Register } from "./AuthPage";
import { Learn, Connect } from "./MockPages";
import "./App.css";

export default function App() {
  // 1. Hold the User State here (So Navbar can see it)
  const [user, setUser] = useState(null);

  // 2. Simple Logout function
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-wrapper">
      {/* Pass user info to Navbar so it can show "Hi, Auditor" */}
      <Navbar user={user} onLogout={handleLogout} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Protected Route: Only show Dashboard if logged in */}
          <Route 
            path="/audit" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          
          <Route path="/learn" element={<Learn />} />
          <Route path="/connect" element={<Connect />} />
          
          {/* Pass setUser to Login so it can update the state when you sign in */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <footer className="footer">
        © 2026 ShariahQuest. Built for Islamic Finance Innovation.
      </footer>
    </div>
  );
}