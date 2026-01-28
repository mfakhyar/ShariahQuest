from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import fitz  # PyMuPDF
from audit_rules import score_audit
from ai_engine import ai_recommendation, extract_score, chat_with_document

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/audit")
async def audit_endpoint(
    file: UploadFile = File(...), 
    doc_type: str = Form(...)  # <--- NEW: Receives the specific category tag (e.g., 'financial_statements')
):
    """
    Siloed Audit Endpoint:
    Accepts ONE file and ONE doc_type tag. 
    It strictly forces the AI/Rule engine to only check criteria relevant to that specific document slot.
    """
    
    # 1. VALIDATION: Ensure valid file type
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDFs are allowed.")

    # 2. FAST EXTRACTION: Extract text from the single file
    try:
        file_bytes = await file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        full_text = ""
        # Optimization: Scan first 10 pages (increased from 5 for better accuracy)
        for page in doc[:10]: 
            full_text += page.get_text()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")

    # 3. SILOED RULE SCAN: Pass 'doc_type' to force specific rule sets
    # Note: You must update score_audit in audit_rules.py to accept this new argument
    base_score, missing, detected_type = score_audit(full_text, required_type=doc_type)
    
    # 4. CONTEXT-AWARE AI CALL
    # We pass 'doc_type' so the AI uses the correct System Prompt (e.g., "Ignore math, look for Signatures")
    snippet_length = 2000 if doc_type == "financial_statements" else 1000
    ai_response = ai_recommendation(missing, full_text[:snippet_length], doc_type=doc_type) 
    
    final_readiness = extract_score(ai_response)

    # 5. DETERMINE COMPLIANCE
    # Logic: If AI score is high (>90) OR (Base Rules passed >90 and no missing items)
    is_compliant = final_readiness >= 90 or (not missing and base_score >= 90)

    return {
        "score": final_readiness if final_readiness > 0 else base_score,
        "status": "Compliant" if is_compliant else "Issues Found",
        "doc_type": doc_type, # Confirm back what was checked
        "recommendations": ai_response,
        "fast_score": base_score
    }


# ... keep your existing app setup and /audit endpoint ...

# ✅ ADD THIS NEW ENDPOINT
@app.post("/chat")
async def chat_endpoint(
    file: UploadFile = File(...), 
    message: str = Form(None)
):
    try:
        # 1. Read the file
        file_bytes = await file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        # Read all pages for the chat context
        for page in doc:
            text += page.get_text()

        # 2. Get AI Response
        ai_reply = chat_with_document(text, message)

        return {"reply": ai_reply}

    except Exception as e:
        return {"reply": f"System Error: {str(e)}"}