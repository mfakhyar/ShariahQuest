// src/api.js
import axios from "axios";

// This points to your running FastAPI backend
const API_URL = "http://localhost:8000";

export const auditDocs = async (files) => {
  const formData = new FormData();
  // Append each selected file to the form data
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  try {
    // Send POST request to /audit endpoint
    const response = await axios.post(`${API_URL}/audit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Audit error:", error);
    alert("Error connecting to backend. Is it running?");
    return null;
  }
};