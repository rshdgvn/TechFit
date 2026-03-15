import fitz

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    filename_lower = filename.lower()
    
    if filename_lower.endswith(".md") or filename_lower.endswith(".txt"):
        try:
            return file_bytes.decode('utf-8')
        except Exception as e:
            return f"Error reading text file: {str(e)}"

    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"