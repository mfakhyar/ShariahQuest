from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import fitz  # PyMuPDF
from audit_rules import score_audit
from ai_engine import ai_recommendation, extract_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/audit")
async def audit_endpoint(files: List[UploadFile] = File(...)):
    # 1. FAST EXTRACTION: Limit to first few pages for the demo
    full_text = ""
    for file in files:
        file_bytes = await file.read()
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        # Optimization: Only scan the first 5 pages for demo speed
        for page in doc[:5]: 
            full_text += page.get_text()

    # 2. INSTANT RULE SCAN: This takes milliseconds
    base_score, missing, doc_type = score_audit(full_text)
    
    # 3. FAST AI CALL: Reduce the snippet size to 1000 chars
    # Flash is faster with smaller context
    ai_response = ai_recommendation(missing, full_text[:1000]) 
    final_readiness = extract_score(ai_response)

    return {
        "score": final_readiness if final_readiness > 0 else base_score,
        "status": "Compliant" if (final_readiness >= 90 or (not missing and base_score >= 90)) else "Issues",
        "doc_type": doc_type,
        "recommendations": ai_response,
        "fast_score": base_score # Send this to show progress immediately
    }