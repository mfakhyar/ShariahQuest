import fitz # PyMuPDF

def extract_text_from_pdfs(files):
    full_text = ""
    for file in files:
        # Read the uploaded file bytes
        file_bytes = file.file.read()
        
        # Open PDF from bytes
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        
        for page in doc:
            full_text += page.get_text()
            
    return full_text.lower()