# ShariahQuest
📌 Shariah Audit AI System

A web-based AI-assisted Shariah Audit Readiness Analysis System designed to evaluate an organization’s financial structure, detect Shariah non-compliance (e.g. riba), and generate corrective recommendations.

The system consists of:

⚛️ React (Vite) Frontend

🧠 Python-based AI Backend

🏗️ Project Structure
shariah-audit-ai/
│
├── backend/                  # AI & audit processing backend (Python)
│   ├── ai_engine.py          # Core AI readiness analysis logic
│   ├── audit_rules.py        # Shariah compliance rules & thresholds
│   ├── pdf_utils.py          # PDF report generation utilities
│   └── main.py               # Backend entry point (API server)
│
├── src/                      # Frontend source code (React + Vite)
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── api.js
│   ├── context.jsx
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Upload.jsx
│   ├── Result.jsx
│   ├── AuthPage.jsx
│   ├── AuditRow.jsx
│   ├── Navbar.jsx
│   └── MockPages.jsx
│
├── demo document/            # Sample data & demo materials
├── README.md
└── package.json

🚀 Tech Stack
Frontend

React (Vite)

JavaScript (ES6)

CSS

Context API

REST API communication

Backend

Python 3

Rule-based AI logic

Shariah audit evaluation engine

PDF report generation

🧠 Backend Architecture Explained
🔹 main.py

Entry point of the backend

Starts the API server

Receives audit data from frontend

Sends data to AI engine

Returns readiness score, risk, and fix

🔹 ai_engine.py

Core AI logic

Calculates:

Shariah Readiness Score

Risk classification

Compliance status

Combines financial data + audit rules

🔹 audit_rules.py

Contains Shariah compliance rules, such as:

Maximum conventional debt thresholds

Cash placement rules

Financing structure validation

Easily extendable for:

AAOIFI standards

SAC BNM guidelines

🔹 pdf_utils.py

Generates Shariah Audit Reports (PDF)

Includes:

Readiness score

Risk explanation

Shariah-compliant recommendations

Used for official reporting & documentation

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/shariah-audit-ai.git
cd shariah-audit-ai

🖥️ Frontend Setup
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🧠 Backend Setup (Python)
Install Dependencies
cd backend
pip install -r requirements.txt


(If requirements.txt not created yet, typical libs include Flask / FastAPI / reportlab)

Run Backend
python main.py


Backend runs at:

http://localhost:5000

🔄 How Frontend & Backend Communicate

User uploads financial data (balance sheet / audit inputs)

Frontend sends data via API (api.js)

Backend:

Applies Shariah audit rules

Computes readiness score

Identifies risks (e.g. riba exposure)

Generates corrective recommendations

Results displayed in Result Dashboard

Optional: PDF audit report generated

📊 AI Readiness Output Example
READINESS SCORE: 100%

STATUS: Fully Shariah-Compliant

RISK: None detected

FIX: Maintain continuous Shariah governance and periodic audits

🧪 Testing & Demo

Use demo document/ for sample audit data

MockPages.jsx allows UI testing without backend

Backend logic can be tested independently via Postman or curl

📌 Future Enhancements

Scholar verification workflow

Machine learning-based risk prediction

Integration with Islamic banks

Multi-company audit history

Role-based access control

📜 Disclaimer

This system is developed for educational, research, and prototype purposes.
It does not replace official Shariah advisory rulings.

✨ Author

Faiz Akhyar
