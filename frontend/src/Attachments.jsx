import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Bot, User, FileText, Loader2 } from "lucide-react";
import { sendChat } from "./api"; // Import the new API function
import "./Attachments.css";

export default function Attachments() {
  const [messages, setMessages] = useState([
    { 
      sender: "ai", 
      text: "Salam! Upload a Fatwa, Agreement, or Report, and I will summarize it for you." 
    }
  ]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Auto-send upon selection to get summary
      handleSend(file, "Summarize this document");
    }
  };

  const handleSend = async (fileOverride = null, textOverride = null) => {
    const fileToSend = fileOverride || selectedFile;
    const textToSend = textOverride || input;

    if (!fileToSend && !textToSend) return;

    // 1. Add User Message to Chat
    const userMsg = { 
      sender: "user", 
      text: textToSend, 
      file: fileToSend ? fileToSend.name : null 
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // 2. Call API
    const reply = await sendChat(fileToSend, textToSend);

    // 3. Add AI Response
    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setLoading(false);
    
    // Clear file after processing (optional)
    if (fileOverride) setSelectedFile(fileOverride); 
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        
        {/* Chat Header */}
        <div className="chat-header">
          <div className="ai-avatar">
            <Bot size={24} color="white" />
          </div>
          <div>
            <h2>Shariah AI Assistant</h2>
            <p>Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.sender}`}>
              <div className="bubble">
                {msg.file && (
                  <div className="file-attachment">
                    <FileText size={16} /> {msg.file}
                  </div>
                )}
                {/* Render text with line breaks */}
                <div className="message-text">
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="message-row ai">
              <div className="bubble loading">
                <Loader2 className="spin" size={18} /> Analyzing document...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-area">
          <label className="attach-btn">
            <Paperclip size={20} />
            <input type="file" hidden accept=".pdf" onChange={handleFileSelect} />
          </label>
          
          <input 
            type="text" 
            placeholder={selectedFile ? `Ask about ${selectedFile.name}...` : "Upload a file to start..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={!selectedFile && !input}
          />
          
          <button 
            className="send-btn" 
            onClick={() => handleSend()}
            disabled={(!selectedFile && !input) || loading}
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}