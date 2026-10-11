import uuid
from services.text_preprocessor import clean_legal_text

def parse_raw_text(filename: str, raw_text: str) -> dict:
    cleaned = clean_legal_text(raw_text)
    return {
        "id": f"doc_{uuid.uuid4().hex[:8]}",
        "filename": filename,
        "text": cleaned,
        "size_bytes": len(raw_text.encode('utf-8'))
    }
