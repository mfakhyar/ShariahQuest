import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, Mail, Phone, MapPin, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import "./Consultation.css"; 

export default function Consultation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default data if accessed directly
  const advisor = location.state?.advisor || { 
    name: "Dr. Abdullah", 
    role: "Certified Shariah Auditor", 
    email: "abdullah@shariahquest.com",
    phone: "+60 3-2199 4400",
    location: "Kuala Lumpur, Malaysia"
  };

  // State
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reason, setReason] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle | success

  // Mock Logic: Generate different slots based on date
  const getSlotsForDate = (date) => {
    // Deterministic mock availability based on day of month
    const day = new Date(date).getDate();
    
    // Example: Even days have morning slots, Odd days have afternoon
    if (day % 2 === 0) {
      return [
        { time: "09:00 AM", available: true },
        { time: "10:30 AM", available: false }, // Booked
        { time: "11:30 AM", available: true },
        { time: "02:00 PM", available: true },
      ];
    } else {
      return [
        { time: "02:30 PM", available: true },
        { time: "03:30 PM", available: false }, // Booked
        { time: "04:30 PM", available: true },
        { time: "05:00 PM", available: false }, // Booked
      ];
    }
  };

  const currentSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

  const handleBook = () => {
    setBookingStatus("success");
    // In a real app, this would send an API request or trigger an email
  };

  return (
    <div className="consult-page">
      <button className="btn-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back to Advisors
      </button>

      <div className="consult-layout">
        
        {/* --- LEFT PANEL: ADVISOR PROFILE & CONTACT --- */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {advisor.name.charAt(0)}
            </div>
            <h1>{advisor.name}</h1>
            <span className="profile-role">{advisor.role}</span>
          </div>

          <div className="contact-info">
            <div className="contact-row">
              <Mail size={18} className="icon"/>
              <span>{advisor.email || "contact@shariahquest.com"}</span>
            </div>
            <div className="contact-row">
              <Phone size={18} className="icon"/>
              <span>{advisor.phone || "+60 3-5555 0199"}</span>
            </div>
            <div className="contact-row">
              <MapPin size={18} className="icon"/>
              <span>{advisor.location || "Cyberjaya, Malaysia"}</span>
            </div>
          </div>

          <div className="action-buttons">
            <a href={`mailto:${advisor.email}`} className="btn-email">
              Send Email
            </a>
          </div>

          <div className="profile-bio">
            <h3>Expertise</h3>
            <p>Specializes in Sukuk structuring, Mudharabah contracts, and AAOIFI compliance auditing. Available for high-level consultations and audit reviews.</p>
          </div>
        </div>

        {/* --- RIGHT PANEL: CALENDAR & BOOKING --- */}
        <div className="booking-card">
          <div className="card-header">
            <h2>Check Availability</h2>
            <p>Select a date to view open time slots.</p>
          </div>

          {bookingStatus === "success" ? (
            <div className="success-view">
              <div className="icon-circle">
                <CheckCircle size={48} color="white" />
              </div>
              <h2>Appointment Confirmed!</h2>
              <p>We have sent a calendar invite to your email.</p>
              <div className="summary-box">
                <strong>{advisor.name}</strong><br/>
                {selectedDate} at {selectedSlot?.time}
              </div>
              <button className="btn-reset" onClick={() => setBookingStatus("idle")}>Book Another</button>
            </div>
          ) : (
            <div className="booking-form">
              {/* Date Selection */}
              <div className="form-group">
                <label>Select Date</label>
                <input 
                  type="date" 
                  className="input-date" 
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedSlot(null);
                  }}
                />
              </div>

              {/* Dynamic Slots */}
              {selectedDate && (
                <div className="form-group slide-in">
                  <label>Available Slots for {selectedDate}</label>
                  <div className="slots-container">
                    {currentSlots.map((slot, idx) => (
                      <button 
                        key={idx}
                        disabled={!slot.available}
                        className={`slot-chip ${selectedSlot === slot ? "selected" : ""} ${!slot.available ? "booked" : ""}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot.time}
                        {!slot.available && <span className="booked-label">Booked</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Note / Context */}
              <div className="form-group">
                <label>Topic / Reason for Consultation</label>
                <textarea 
                  rows="3" 
                  placeholder="E.g. Reviewing my Murabahah contract clauses..." 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              {/* Submit Action */}
              <div className="form-footer">
                {!selectedSlot ? (
                  <div className="info-msg">
                    <AlertCircle size={16} /> Please select a date and time slot.
                  </div>
                ) : (
                  <button className="btn-confirm" onClick={handleBook}>
                    Confirm Appointment
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}