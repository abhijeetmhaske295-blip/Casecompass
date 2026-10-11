import re
from datetime import datetime
from dateutil import parser as dt_parser

MONTHS = r'(?:January|February|March|April|May|June|July|August|September|October|November|December)'
DATE_PATTERNS = [
    # April 15, 2024 or April 15th, 2024
    rf'({MONTHS}\s+\d{{1,2}}(?:st|nd|rd|th)?,?\s+\d{{4}})',
    # 15th day of April, 2024
    rf'(\d{{1,2}}(?:st|nd|rd|th)?\s+day\s+of\s+{MONTHS},?\s+\d{{4}})',
    # 2024-04-15
    r'(\b\d{4}-\d{2}-\d{2}\b)',
    # 04/15/2024
    r'(\b\d{1,2}/\d{1,2}/\d{4}\b)'
]

def extract_dates_from_string(text: str):
    matches = []
    for pattern in DATE_PATTERNS:
        for m in re.finditer(pattern, text, re.IGNORECASE):
            raw = m.group(1)
            standardized = normalize_date_string(raw)
            matches.append({"raw": raw, "iso": standardized, "start": m.start(), "end": m.end()})
    return matches

def normalize_date_string(date_str: str) -> str | None:
    try:
        clean_str = re.sub(r'(\d+)(st|nd|rd|th)', r'\1', date_str)
        clean_str = re.sub(r'day\s+of\s+', '', clean_str, flags=re.IGNORECASE)
        parsed = dt_parser.parse(clean_str, fuzzy=True)
        return parsed.strftime("%Y-%m-%d")
    except Exception:
        return None
