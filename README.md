# 🕌 ShariahQuest

### AI-Powered Shariah Audit Readiness System

ShariahQuest is a **web-based AI-assisted Shariah Audit Readiness Analysis System** designed to help financial institutions and organizations assess their preparedness for **Shariah compliance audits**.

The system analyzes uploaded financial and audit-related documents to:

* Detect **Shariah non-compliance risks** (e.g. riba, non-compliant financing)
* Generate an **audit readiness score**
* Provide **clear corrective recommendations** aligned with Shariah governance standards

---

## 🎯 Key Features

* 📄 Upload financial & audit documents (PDF)
* 🧠 AI-assisted Shariah compliance analysis
* 📊 Shariah Audit Readiness Score (%)
* ⚠️ Risk identification (e.g. riba exposure)
* 🛠 Actionable improvement recommendations
* 💻 Clean and user-friendly web interface

---

## 🏗 System Architecture

```
Frontend (React + Vite)
        │
        │ REST API (JSON)
        ▼
Backend (FastAPI - Python)
        │
        ├── AI Analysis Engine
        ├── Shariah Audit Rules
        └── PDF Processing Utilities
```

---

## 📁 Project Structure

```
shariah-audit-ai/
│
├── backend/                     # Python AI backend (FastAPI)
│   ├── main.py                  # Backend entry point (API server)
│   ├── ai_engine.py             # Core AI readiness analysis logic
│   ├── audit_rules.py           # Shariah compliance rules & thresholds
│   ├── pdf_utils.py             # PDF extraction & processing utilities
│
├── src/                         # Frontend source code (React + Vite)
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── api.js                   # API communication layer
│   ├── context.jsx              # Global state management (Context API)
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   ├── Upload.jsx
│   ├── Result.jsx
│   ├── AuthPage.jsx
│   ├── AuditRow.jsx
│   ├── Navbar.jsx
│   └── MockPages.jsx
│
├── demo document/               # Sample data & demo materials
│
├── README.md
```

---

## 🚀 Tech Stack

### Frontend

* React (Vite)
* JavaScript (ES6)
* CSS
* Context API
* Axios (REST API communication)

### Backend

* Python 3.10+
* FastAPI
* Uvicorn
* Rule-based AI logic
* PDF text extraction

### AI / Analysis

* Document-based analysis
* Shariah rule evaluation
* Readiness scoring model
* (Optional) LLM integration (e.g. Gemini)

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup (Python)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install fastapi uvicorn
uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

### 2️⃣ Frontend Setup (React)

```bash
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🔌 API Overview (Backend)

| Endpoint   | Method | Description                                      |
| ---------- | ------ | ------------------------------------------------ |
| `/analyze` | POST   | Upload document & perform Shariah audit analysis |
| `/health`  | GET    | Backend health check                             |

---

## 📊 Example Output

```
🎯 Shariah Audit Readiness Analysis

Readiness Score: 80%

Risk:
Core business activities and revenue streams require formal Shariah certification.

Recommendation:
Conduct detailed Shariah review of business operations and obtain certification
from an authorized Shariah Advisory Board.
```

---

## 🎓 Academic & Practical Use

This project is suitable for:

* 🎓 Final Year Project (FYP)
* 🏦 Islamic banking & finance research
* 📑 Shariah audit simulations
* 🤖 AI application in Islamic finance
* 📊 Governance, Risk & Compliance (GRC) systems

---

## ⚠️ Disclaimer

This system is intended for **educational and prototype purposes only**.
It does **not replace official Shariah audits** conducted by certified Shariah auditors or regulatory authorities.

---

## 📌 Future Enhancements

* Integration with official Shariah standards (AAOIFI / BNM)
* Advanced LLM-based document reasoning
* Multi-document comparative audits
* User authentication & role management
* Exportable audit reports (PDF)

---

## 👨‍💻 Author

**Faiz Akhyar**
