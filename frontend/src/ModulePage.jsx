import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, PlayCircle, FileText, CheckCircle, ChevronRight } from "lucide-react";
import "./ModulePage.css";

// Mock Data for the Modules
const moduleData = {
  fundamentals: {
    title: "Fundamentals of Shariah Audit",
    lessons: [
      { id: 1, title: "Introduction to Shariah Governance", type: "video", duration: "15 min" },
      { id: 2, title: "The Role of a Shariah Auditor", type: "text", duration: "10 min" },
      { id: 3, title: "Usul Fiqh Basics", type: "video", duration: "25 min" },
      { id: 4, title: "Module Quiz", type: "quiz", duration: "10 min" }
    ]
  },
  contracts: {
    title: "Commercial Contracts (Fiqh Muamalat)",
    lessons: [
      { id: 1, title: "Understanding Murabahah", type: "video", duration: "20 min" },
      { id: 2, title: "Tawarruq vs. Commodity Murabahah", type: "text", duration: "15 min" },
      { id: 3, title: "Ijarah Structuring", type: "video", duration: "30 min" }
    ]
  },
  // Add more mock data for other IDs if needed
};

export default function ModulePage() {
  const { id } = useParams(); // Get the "id" from the URL (e.g., 'fundamentals')
  const [activeLesson, setActiveLesson] = useState(0);

  const currentModule = moduleData[id] || moduleData.fundamentals; // Fallback to fundamentals
  const currentLesson = currentModule.lessons[activeLesson];

  return (
    <div className="module-page">
      {/* Sidebar: Lesson List */}
      <div className="module-sidebar">
        <div className="sidebar-header">
          <Link to="/learn" className="btn-back-link">
            <ArrowLeft size={16} /> Back
          </Link>
          <h3>{currentModule.title}</h3>
        </div>

        <div className="lesson-list">
          {currentModule.lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className={`lesson-item ${index === activeLesson ? "active" : ""}`}
              onClick={() => setActiveLesson(index)}
            >
              <div className="lesson-icon">
                {lesson.type === "video" ? <PlayCircle size={16}/> : 
                 lesson.type === "quiz" ? <CheckCircle size={16}/> : <FileText size={16}/>}
              </div>
              <div className="lesson-info">
                <span className="lesson-title">{lesson.title}</span>
                <span className="lesson-meta">{lesson.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="module-content-area">
        <div className="content-header">
          <h1>{currentLesson.title}</h1>
          <span className="badge-type">{currentLesson.type.toUpperCase()}</span>
        </div>

        <div className="content-player">
          {currentLesson.type === "video" ? (
            <div className="video-placeholder">
              <PlayCircle size={64} color="white" />
              <p>Video Player Placeholder</p>
            </div>
          ) : currentLesson.type === "quiz" ? (
            <div className="text-content">
              <h3>Knowledge Check</h3>
              <p>1. What is the primary condition for a valid Murabahah contract?</p>
              <ul>
                <li><input type="radio" name="q1" /> Possession of the asset</li>
                <li><input type="radio" name="q1" /> Future delivery date</li>
                <li><input type="radio" name="q1" /> Floating profit rate</li>
              </ul>
            </div>
          ) : (
            <div className="text-content">
              <h3>Lesson Overview</h3>
              <p>
                In this lesson, we explore the fundamental duties of a Shariah auditor as outlined 
                by the Securities Commission Malaysia's Shariah Governance Framework.
              </p>
              <p>
                Key responsibilities include ensuring that all business activities, contracts, 
                and operations adhere strictly to Shariah principles.
              </p>
            </div>
          )}
        </div>

        <div className="content-footer">
          <button 
            className="btn-next"
            disabled={activeLesson >= currentModule.lessons.length - 1}
            onClick={() => setActiveLesson(prev => prev + 1)}
          >
            Next Lesson <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}