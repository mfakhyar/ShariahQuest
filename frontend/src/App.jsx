import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; // ✅ Import useLocation
import Navbar from "./Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Attachments from "./Attachments"; 
import Connect from "./Connect";
import Consultation from "./Consultation";
import Learn from "./Learn";
import ModulePage from "./ModulePage"; 
import { Login, Register } from "./AuthPage";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  // ✅ 1. Create this Helper Component inside App.jsx
  // It handles the "Remembering" logic automatically
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    if (!user) {
      // Redirect to login, but save the current location they were trying to visit
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  };

  return (
    <div className="app-wrapper">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* ✅ 2. Wrap your protected pages with <ProtectedRoute> */}
          
          <Route path="/audit" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          
          <Route path="/attachments" element={
            <ProtectedRoute><Attachments /></ProtectedRoute>
          } />
          
          <Route path="/connect" element={
            <ProtectedRoute><Connect /></ProtectedRoute>
          } />
          
          <Route path="/consultation" element={
            <ProtectedRoute><Consultation /></ProtectedRoute>
          } />
          
          <Route path="/learn" element={
            <ProtectedRoute><Learn /></ProtectedRoute>
          } />
          
          <Route path="/learn/:id" element={
            <ProtectedRoute><ModulePage /></ProtectedRoute>
          } />

          {/* Auth Routes */}
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