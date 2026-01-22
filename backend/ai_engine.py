import google.generativeai as genai
import re

# Use your actual API Key here
genai.configure(api_key="gemini api key")

def ai_recommendation(missing_items, full_text_snippet):
    if not missing_items:
        return "READINESS SCORE: 100%\n✅ All mandatory SC Malaysia markers detected."

    model = genai.GenerativeModel("gemini-2.5-flash")
    prompt = generate_prompt(missing_items, full_text_snippet)
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"READINESS SCORE: 0%\n❌ AI Error: {str(e)}"

def generate_prompt(missing, snippet):
    return f"""
    SC Malaysia Shariah Audit Mode. 
    Context: {snippet[:800]} 
    Gaps: {missing}

    Briefly (max 100 words):
    1. READINESS SCORE: [0-100]%
    2. RISK: [1 sentence]
    3. FIX: [Insert Clause]
    
    FORMAT: Use plain text only. No bolding (**), no hashtags (#).
    """

def extract_score(ai_text):
    """Utility to pull the numerical score out of the AI's text response."""
    match = re.search(r"READINESS SCORE:\s*(\d+)%", ai_text)
    return int(match.group(1)) if match else 0