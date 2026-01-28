import fitz  # PyMuPDF
import os

def get_guideline_text(doc_category=None):
    """
    Reads the 'ICMPS Guidelines 080224.pdf' DIRECTLY from the disk.
    It extracts the full text on-the-fly to serve as the Authority Document.
    """
    # ensure the filename matches exactly what you have in the folder
    pdf_path = "ICMPS Guidelines 080224.pdf"
    
    # Safety check
    if not os.path.exists(pdf_path):
        return f"CRITICAL ERROR: The Authority Document '{pdf_path}' was not found in the backend folder."

    try:
        doc = fitz.open(pdf_path)
        full_text = ""
        
        # Extract text from every page
        for page in doc:
            full_text += page.get_text() + "\n"
            
        return full_text

    except Exception as e:
        return f"ERROR reading Authority PDF: {str(e)}"