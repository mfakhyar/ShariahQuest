import google.generativeai as genai
import re
import os
from knowledge_base import get_guideline_text  # type: ignore

# ✅ API KEY SETUP
MY_API_KEY = "AIzaSyCapfpYXUoMfWEZVlZ_5Oe1SFNspcDFTqA" 
genai.configure(api_key=MY_API_KEY)

def ai_recommendation(missing_items, full_text_snippet, doc_type="general"):
    # Optional: Immediate pass if Rule Engine found nothing wrong
    if not missing_items and doc_type == "general":
        return "READINESS SCORE: 100%\nAll mandatory SC Malaysia markers detected. No AI remediation needed."

    model = genai.GenerativeModel("gemini-2.5-flash")
    
    # RAG Step: Get the law text
    official_rule_text = get_guideline_text(doc_type)
    
    # Build the Clean Prompt
    prompt = generate_prompt(missing_items, full_text_snippet, official_rule_text)
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"READINESS SCORE: 0%\nAI Error: {str(e)}"

def generate_prompt(missing, snippet, official_rule_text):
    """
    Constructs a plain-text prompt with NO unnecessary symbols (no hashtags, no bolding).
    """
    return f"""
ROLE: You are a specialized Shariah Auditor. You strictly enforce the rules found in the attached Authority Document.

1. THE AUTHORITY DOCUMENT (Your Sole Source of Truth)
{official_rule_text}

2. THE USER DOCUMENT (To Be Audited)
"{snippet[:5000]}"

3. DETECTED GAPS
{missing}

4. AUDIT INSTRUCTIONS
A. STRICT GROUNDING: 
Answer ONLY using the information in THE AUTHORITY DOCUMENT.
If the user document violates a rule NOT listed in the Authority Document, IGNORE IT.
Do not use general internet knowledge.

B. MATH OVERRIDE:
If checking Financials, CALCULATE the ratios yourself (Debt/Assets and Non-Halal/Revenue).
TRUST YOUR CALCULATION over any text summary in the User Document.
If (Conventional Debt / Total Assets) is less than 33 percent, it PASSES.
If (Non-Halal Income / Total Revenue) is less than 5 percent, it PASSES.

C. CITATION REQUIRED:
You MUST cite the specific Paragraph or Page from the Authority Document for every finding.
If you cannot find a specific paragraph to support your claim, DELETE THE CLAIM.

5. OUTPUT FORMAT
Provide the response in this exact format:

READINESS SCORE: [0-100]%

REGULATORY CITATION:
[Specific Clause or Page Number from the Authority Document]

REASONING:
[Strict comparison of User Doc vs Authority Doc]

REMEDIATION:
[Action required based on the Guideline]
"""

def extract_score(ai_text):
    """Utility to pull the numerical score out of the AI's text response."""
    match = re.search(r"READINESS SCORE:\s*(\d+)%", ai_text)
    return int(match.group(1)) if match else 0

# ... keep your existing imports and ai_recommendation function ...

# ✅ ADD THIS NEW FUNCTION AT THE BOTTOM
def chat_with_document(file_text, user_message=None):
    """
    Generates a summary or answers a question about the uploaded document.
    """
    model = genai.GenerativeModel("gemini-2.5-flash")

    if not user_message:
        # Default behavior: Summarize
        prompt = f"""
        ROLE: You are an expert Islamic Finance Analyst.
        
        DOCUMENT TEXT:
        "{file_text[:10000]}"
        
        TASK:
        Provide a concise, professional summary of this document. 
        Highlight any key dates, financial figures, or Shariah-related clauses.
        
        FORMAT:
        Use bullet points for readability.
        """
    else:
        # Q&A behavior
        prompt = f"""
        ROLE: You are an expert Islamic Finance Analyst.
        
        DOCUMENT TEXT:
        "{file_text[:10000]}"
        
        USER QUESTION:
        "{user_message}"
        
        TASK:
        Answer the user's question strictly based on the provided document text.
        """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error processing document: {str(e)}"