from schemas import TimelineEvent
from services.deadline_detector import detect_deadlines_from_events

def test_detect_deadlines():
    evt = TimelineEvent(
        id="e1", date="2024-06-01", raw_date_text="June 01, 2024",
        title="Witness Deadline", description="Submit list by June 01, 2024",
        document_id="d1", document_name="doc.txt", source_snippet="",
        is_deadline=True
    )
    deadlines = detect_deadlines_from_events([evt])
    assert len(deadlines) == 1
    assert deadlines[0].due_date == "2024-06-01"
