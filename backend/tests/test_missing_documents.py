from schemas import TimelineEvent
from services.gap_detector import detect_missing_documents

def test_gap_detection():
    evt = TimelineEvent(
        id="e2", date="2024-05-25", raw_date_text="May 25, 2024",
        title="Motion", description="Plaintiff moves pursuant to Court Order of March 05, 2024",
        document_id="d2", document_name="motion.txt", source_snippet="",
        is_deadline=False
    )
    gaps = detect_missing_documents([evt], {})
    assert len(gaps) == 1
    assert "March 05" in gaps[0].title
