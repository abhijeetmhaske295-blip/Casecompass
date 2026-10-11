import re

def clean_legal_text(text: str) -> str:
    # Normalize multiple line breaks and strip trailing spaces
    cleaned = re.sub(r'\r\n', '\n', text)
    cleaned = re.sub(r'[ \t]+', ' ', cleaned)
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned)
    return cleaned.strip()
