import re

def get_checklist(text_lower, required_type=None):
    """
    Returns specific checklists based on SC-GL/1-2022 (R1-2024).
    If required_type is provided (from frontend), it forces that specific rule set.
    """
    
    # 1. Financial Statements (Stock Screening - Chapter 8)
    if required_type == "financial_statements":
        return "SC_STOCK_SCREENING_CHAP_8", {
            "Quantitative Benchmarks (33%)": [
                "total assets", "conventional term loans", "cash in conventional accounts"
            ],
            "Income Benchmarks (5%)": [
                "total group revenue", "conventional interest income", "gambling", "liquor"
            ]
        }
    
    # 2. Shariah Adviser's Report (Sukuk/General - Chapter 3)
    elif required_type == "shariah_report":
        return "SC_SUKUK_CHAP_3", {
            "Appointment & Endorsement": [
                "shariah adviser", "registered with the sc", "shariah pronouncement", 
                "compliance with sc guidelines"
            ],
            "Signatures": [
                "signed by", "date"
            ]
        }

    # 3. Default / General Fallback
    sc_keywords = ["annual report", "financial statement", "prospectus", "balance sheet"]
    if any(k in text_lower for k in sc_keywords):
        return "STOCK_SCREENING_GENERIC", {
            "Financials": ["total assets", "revenue"],
            "Governance": ["shariah adviser", "statutory declaration"]
        }
        
    return "GENERAL_DOC", {"Essentials": ["date", "signature"]}

def calculate_shariah_ratios(text):
    """
    Extracts numerical data and verifies against SC Malaysia 33% and 5% benchmarks.
    """
    assets_match = re.search(r"total assets:\s*rm\s*([\d,]+)", text)
    debt_match = re.search(r"conventional term loans:\s*rm\s*([\d,]+)", text)
    revenue_match = re.search(r"total group revenue:\s*rm\s*([\d,]+)", text)
    tainted_match = re.search(r"conventional interest income:\s*rm\s*([\d,]+)", text)

    results = {"compliant": True, "details": []}

    if assets_match and debt_match:
        assets = float(assets_match.group(1).replace(',', ''))
        debt = float(debt_match.group(1).replace(',', ''))
        if assets > 0:
            debt_ratio = (debt / assets) * 100
            if debt_ratio <= 33:
                results["details"].append(f"Debt Ratio {debt_ratio:.2f}% is COMPLIANT (<= 33%)")
            else:
                results["compliant"] = False
                results["details"].append(f"BREACH: Debt Ratio {debt_ratio:.2f}% > 33%")

    if revenue_match and tainted_match:
        revenue = float(revenue_match.group(1).replace(',', ''))
        tainted = float(tainted_match.group(1).replace(',', ''))
        if revenue > 0:
            income_ratio = (tainted / revenue) * 100
            if income_ratio <= 5:
                results["details"].append(f"Tainted Income {income_ratio:.2f}% is COMPLIANT (<= 5%)")
            else:
                results["compliant"] = False
                results["details"].append(f"BREACH: Tainted Income {income_ratio:.2f}% > 5%")

    return results

# ✅ UPDATED: Now accepts 'required_type'
def score_audit(text, required_type=None):
    text_lower = text.lower()
    
    # Pass required_type to get_checklist
    contract_type, checklist = get_checklist(text_lower, required_type)
    
    found_keywords = []
    missing_keywords = []
    
    # 1. Keyword Check
    for section, keywords in checklist.items():
        for k in keywords:
            if k in text_lower:
                found_keywords.append(k)
            else:
                missing_keywords.append(f"Missing '{k}' required for {section}")

    # 2. Ratio Check (Only if it's a financial document)
    ratio_details = []
    if "SCREENING" in contract_type:
        ratio_check = calculate_shariah_ratios(text_lower)
        ratio_details = ratio_check["details"]
        is_ratio_compliant = ratio_check["compliant"]
    else:
        is_ratio_compliant = True # Not applicable for other docs

    # 3. Final Scoring
    total_kws = sum(len(v) for v in checklist.values())
    keyword_score = (len(found_keywords) / total_kws) * 100 if total_kws > 0 else 0
    
    # Penalize score if ratios fail
    final_score = keyword_score if is_ratio_compliant else (keyword_score * 0.5)

    return round(final_score, 2), missing_keywords + ratio_details, contract_type