from services.extraction import extract_events_from_text

def test_extract_events():
    sample = "The hearing is set for June 22, 2024 at 10:00 AM."
    events = extract_events_from_text("doc_1", "notice.txt", sample)
    assert len(events) >= 1
    assert events[0].date == "2024-06-22"
