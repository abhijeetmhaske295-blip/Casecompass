import uuid
import re
from schemas import TimelineEvent
from services.date_parser import extract_dates_from_string
from utils.source_utils import create_snippet

def extract_events_from_text(doc_id: str, doc_name: str, text: str) -> list[TimelineEvent]:
    events = []
    paragraphs = [p for p in text.split('\n') if p.strip()]

    for p in paragraphs:
        detected_dates = extract_dates_from_string(p)
        for d in detected_dates:
            snippet = create_snippet(text, p)
            title = summarize_paragraph_topic(p)
            is_deadline = bool(re.search(r'deadline|shall complete|no later than|within \d+ days|scheduled for', p, re.IGNORECASE))
            
            events.append(TimelineEvent(
                id=f"evt_{uuid.uuid4().hex[:8]}",
                date=d["iso"],
                raw_date_text=d["raw"],
                title=title,
                description=p[:220].strip() + ("..." if len(p) > 220 else ""),
                document_id=doc_id,
                document_name=doc_name,
                source_snippet=snippet,
                confidence_score=0.96 if d["iso"] else 0.70,
                review_status="pending",
                is_deadline=is_deadline
            ))
            
    return events

def summarize_paragraph_topic(p: str) -> str:
    p_lower = p.lower()
    if "injunction" in p_lower:
        return "Preliminary Injunction Order"
    if "hearing" in p_lower:
        return "Formal Hearing Scheduled"
    if "conference" in p_lower:
        return "Case Management Conference"
    if "affidavit" in p_lower or "sworn statement" in p_lower:
        return "Witness Affidavit Statement"
    if "disclosure" in p_lower or "discovery" in p_lower:
        return "Discovery Procedural Order"
    if "motion" in p_lower:
        return "Formal Court Motion"
    return "Case Milestone Event"
