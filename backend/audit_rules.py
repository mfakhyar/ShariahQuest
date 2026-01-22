import re

def get_checklist(text_lower):
    """
    Detects if the document is part of a Stock Screening submission 
    and returns the specialized SC Malaysia checklist.
    """
    sc_keywords = ["annual report", "financial statement", "prospectus", "techalpha", "balance sheet"]
    if any(k in text_lower for k in sc_keywords):
        return "STOCK_SCREENING", {
            "Financial Benchmarks (33%)": [
                "total assets", "conventional term loans", "islamic financing", "cash in conventional"
            ],
            "Income Benchmarks (5%)": [
                "total group revenue", "conventional interest", "tainted ratio", "software sales"
            ],
            "Regulatory Documentation": [
                "shariah adviser", "sc reg no", "statutory declaration", "sac", "prospectus"
            ]
        }
    return "GENERAL", {"Essentials": ["date", "signature"]}

def calculate_shariah_ratios(text):
    """
    Extracts numerical data and verifies against SC Malaysia 33% and 5% benchmarks.
    """
    # 1. QUANTITATIVE SCAN (33% Benchmark)
    assets_match = re.search(r"total assets:\s*rm\s*([\d,]+)", text)
    debt_match = re.search(r"conventional term loans:\s*rm\s*([\d,]+)", text)
    
    # 2. QUALITATIVE SCAN (5% Benchmark)
    revenue_match = re.search(r"total group revenue:\s*rm\s*([\d,]+)", text)
    tainted_match = re.search(r"conventional interest income:\s*rm\s*([\d,]+)", text)

    results = {"compliant": True, "details": []}

    if assets_match and debt_match:
        assets = float(assets_match.group(1).replace(',', ''))
        debt = float(debt_match.group(1).replace(',', ''))
        debt_ratio = (debt / assets) * 100
        # SC Benchmark: Debt <= 33% of Total Assets
        if debt_ratio <= 33:
            results["details"].append(f"Debt Ratio {debt_ratio:.2f}% is COMPLIANT (<= 33%)")
        else:
            results["compliant"] = False

    if revenue_match and tainted_match:
        revenue = float(revenue_match.group(1).replace(',', ''))
        tainted = float(tainted_match.group(1).replace(',', ''))
        income_ratio = (tainted / revenue) * 100
        # SC Benchmark: Non-halal income <= 5% of Total Revenue
        if income_ratio <= 5:
            results["details"].append(f"Tainted Income {income_ratio:.2f}% is COMPLIANT (<= 5%)")
        else:
            results["compliant"] = False

    return results

def score_audit(text):
    text_lower = text.lower()
    contract_type, checklist = get_checklist(text_lower)
    
    found_keywords = []
    missing_keywords = []
    
    # Keyword Completion Audit
    for section, keywords in checklist.items():
        for k in keywords:
            if k in text_lower:
                found_keywords.append(k)
            else:
                missing_keywords.append(f"⚠️ {section}: Missing '{k}'")

    # Ratio Verification Audit
    ratio_check = calculate_shariah_ratios(text_lower)
    
    # Final Readiness Score
    # Calculation: (Found Keywords / Total Keywords) weighted with Ratio compliance
    keyword_score = (len(found_keywords) / sum(len(v) for v in checklist.values())) * 100
    final_score = keyword_score if ratio_check["compliant"] else (keyword_score * 0.5)

    status = "✅ Compliant" if final_score >= 95 else "❌ Issues Found"
    
    return round(final_score, 2), status, missing_keywords + ratio_check["details"]