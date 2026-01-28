// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8000";

// ✅ UPDATED: Accepts a single 'file' and a 'docTypeTag'
export const auditDocs = async (file, docTypeTag) => {
  const formData = new FormData();
  
  // 1. Append the single file (Key must match backend 'file: UploadFile')
  formData.append("file", file);
  
  // 2. Append the document type tag (Key must match backend 'doc_type: str')
  // We default to "general" if no tag is provided to prevent errors
  formData.append("doc_type", docTypeTag || "general");

  try {
    const response = await axios.post(`${API_URL}/audit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Audit error:", error);
    // Optional: Only alert if it's a connection error, not just a 422 validation error
    if (error.code === "ERR_NETWORK") {
        alert("Error connecting to backend. Is uvicorn running?");
    }
    return null;
  }
};

// ... keep your existing imports and auditDocs function ...

// ✅ ADD THIS NEW FUNCTION
export const sendChat = async (file, message) => {
  const formData = new FormData();
  formData.append("file", file);
  if (message) formData.append("message", message);

  try {
    const response = await axios.post(`${API_URL}/chat`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.reply;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I couldn't reach the server.";
  }
};