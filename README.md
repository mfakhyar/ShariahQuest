# ShariahQuest: The AI-Powered Audit Workbench

**ShariahQuest** is a specialized RegTech platform designed to automate Shariah compliance auditing for Islamic Financial Institutions. It solves the problem of "AI Hallucinations" in financial audits by using a **Hybrid Intelligence Engine**—combining deterministic Python logic for math/ratios with Google's Gemini 2.5 Flash for context-aware reasoning.

---

## 🚀 Key Features

* **Siloed Audit Engine:** Automatically switches rule sets based on document type (e.g., *SC Malaysia Stock Screening* vs. *BNM Governance Policy*).
* **Math Override Protocol:** Uses Python to calculate critical ratios (e.g., 33% Debt Ratio) deterministically, preventing LLM calculation errors.
* **RAG-Powered Compliance:** Retrieves actual legal text from the *ICMPS Guidelines* to ground every AI response in real regulation.
* **Consultant-in-the-Loop:** A dedicated "Chat with Document" feature that allows human auditors to query specific clauses instantly.
* **Certified Readiness Reports:** Generates granular "Readiness Scores" to tell auditors exactly when a document is ready for submission.

---

## 🏗️ Technical Architecture

The system is built on a "Hybrid Intelligence" model that separates **Control**, **Logic**, and **Reasoning**.

### **Backend Structure (`/backend`)**

* 
**`main.py` (The Controller):** The FastAPI gateway that routes documents to the correct "Silo" (Financial vs. Legal).


* **`audit_rules.py` (The Guardrails):** Contains the deterministic Python logic for the "Math Override." It calculates the 33% Debt and 5% Tainted Income ratios using Regex, ensuring zero hallucinations.


* **`ai_engine.py` (The Brain):** Manages the interaction with **Google Gemini 2.5 Flash**. It uses RAG to fetch the actual *ICMPS Guidelines* from `knowledge_base.py` and injects them into the prompt.


* 
**`knowledge_base.py`:** A librarian module that reads the regulatory PDFs directly from the disk to serve as the "Authority Document".



### **Frontend Structure (`/frontend`)**

* 
**React + Vite:** A fast, responsive dashboard for auditors.


* 
**`AuditRow.jsx`:** Displays the granular compliance breakdown (Ratios vs. Keywords).


* 
**`Consultation.jsx`:** The interface for the "Consultant-in-the-Loop" chat feature.



---

## 📂 Project Structure

```bash
ShariahQuest/
├── backend/                  # Python FastAPI Backend
│   ├── ICMPS Guidelines...   # The Authority Document PDF
│   ├── ai_engine.py          # Gemini 2.5 Integration
│   ├── audit_rules.py        # Deterministic Math Logic
│   ├── knowledge_base.py     # RAG Retrieval Logic
│   ├── main.py               # API Gateway & Routing
│   └── pdf_utils.py          # PyMuPDF Extraction
│
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/       # UI Components (Navbar, etc.)
│   │   ├── api.js            # Axios Connections to Backend
│   │   ├── Dashboard.jsx     # Main Audit Interface
│   │   └── App.jsx           # Routing Logic
│   └── package.json
│
├── demo document/            # Sample PDFs for Testing
│   ├── Audited_Financial...  # Sample Financial Statements
│   └── Murabahah_Agreement...# Sample Legal Contracts
│
└── README.md

```

---

## 🛠️ Installation & Setup

### **Prerequisites**

* Python 3.9+
* Node.js & npm
* A Google Gemini API Key

### **1. Backend Setup**

Navigate to the backend folder and install dependencies.

```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install required packages
pip install fastapi uvicorn google-generativeai pymupdf python-multipart

```

**Run the Server:**

```bash
uvicorn main:app --reload
# Server will start at http://127.0.0.1:8000

```

### **2. Frontend Setup**

Navigate to the frontend folder and install dependencies.

```bash
cd frontend
npm install

```

**Run the Client:**

```bash
npm run dev
# App will start at http://localhost:5173

```

---

## 🧪 How to Test (Demo Flow)

1. **Login:** Access the dashboard (Demo Mode).
2. **Select Engine:** Choose **"Stock Screening (SC Malaysia)"** from the dropdown.
3. 
**Upload:** Go to the `demo document/` folder and upload `Audited_Financial_Statement_FIXED.pdf`.


4. **View Result:**
* Observe the **"Math Override"** in action: The backend calculates the Debt Ratio (e.g., 28%) and marks it "Pass" before the AI speaks.
* Check the **"AI Remediation"**: The AI suggests specific clauses for any missing keywords.



---

## 📜 License

This project is a prototype for educational and innovation purposes.

---

**Developed by [Your Name/Team Name]**
*Built for the Future of Islamic Finance.*
