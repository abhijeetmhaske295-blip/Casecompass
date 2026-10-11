from datetime import datetime
from schemas import DocumentResponse, TimelineEvent, DashboardStats
from services.deadline_detector import detect_deadlines_from_events
from services.conflict_detector import detect_conflicts
from services.gap_detector import detect_missing_documents

_DOCUMENTS_STORE = {}
_EVENTS_STORE = []

# Preload sample data if available
def initialize_sample_store():
    global _DOCUMENTS_STORE, _EVENTS_STORE
    _DOCUMENTS_STORE["doc_court_order"] = {
        "id": "doc_court_order",
        "filename": "court_order.txt",
        "upload_date": "2024-05-10T10:00:00",
        "size_bytes": 1024,
        "event_count": 3,
        "status": "processed"
    }
    _DOCUMENTS_STORE["doc_hearing_notice"] = {
        "id": "doc_hearing_notice",
        "filename": "hearing_notice.txt",
        "upload_date": "2024-05-10T10:05:00",
        "size_bytes": 512,
        "event_count": 2,
        "status": "processed"
    }
    _DOCUMENTS_STORE["doc_affidavit"] = {
        "id": "doc_affidavit",
        "filename": "conflicting_dates.txt",
        "upload_date": "2024-05-10T10:10:00",
        "size_bytes": 620,
        "event_count": 2,
        "status": "processed"
    }

    _EVENTS_STORE = [
        TimelineEvent(
            id="evt_101",
            date="2024-04-15",
            raw_date_text="April 15, 2024",
            title="Preliminary Injunction Issued",
            description="Court ordered Horizon Dynamics to immediately suspend distribution of Version 4.2 software.",
            document_id="doc_court_order",
            document_name="court_order.txt",
            source_snippet="Date of Order: April 15, 2024. Defendant shall suspend distribution effective immediately.",
            confidence_score=0.98,
            review_status="verified",
            is_deadline=False
        ),
        TimelineEvent(
            id="evt_102",
            date="2024-04-19",
            raw_date_text="April 19, 2024",
            title="Injunction Received Claimed by Witness",
            description="Witness Sarah Lin asserts preliminary injunction was only received on April 19, 2024.",
            document_id="doc_affidavit",
            document_name="conflicting_dates.txt",
            source_snippet="The preliminary injunction was received by our office on April 19, 2024, not April 15, 2024.",
            confidence_score=0.94,
            review_status="flagged",
            is_deadline=False
        ),
        TimelineEvent(
            id="evt_103",
            date="2024-05-15",
            raw_date_text="May 15, 2024",
            title="Initial Disclosures & Motions Deadline",
            description="The parties shall complete initial disclosures and discovery motions no later than May 15, 2024.",
            document_id="doc_court_order",
            document_name="court_order.txt",
            source_snippet="The parties shall complete initial disclosures no later than May 15, 2024.",
            confidence_score=0.99,
            review_status="verified",
            is_deadline=True
        ),
        TimelineEvent(
            id="evt_104",
            date="2024-06-01",
            raw_date_text="June 01, 2024",
            title="Witness List Submission Deadline",
            description="Failure to submit witness lists by June 01, 2024 will result in forfeiture of testimony.",
            document_id="doc_hearing_notice",
            document_name="hearing_notice.txt",
            source_snippet="Failure to submit witness lists by June 01, 2024 will result in forfeiture of testimony.",
            confidence_score=0.97,
            review_status="pending",
            is_deadline=True
        ),
        TimelineEvent(
            id="evt_105",
            date="2024-06-22",
            raw_date_text="June 22, 2024 at 10:00 AM",
            title="Formal Evidentiary Hearing",
            description="Evidentiary hearing set for June 22, 2024 at 10:00 AM in Courtroom 4B.",
            document_id="doc_hearing_notice",
            document_name="hearing_notice.txt",
            source_snippet="Evidentiary hearing regarding Case CV-2024-08912 has been set for June 22, 2024 at 10:00 AM.",
            confidence_score=0.99,
            review_status="verified",
            is_deadline=False
        )
    ]

initialize_sample_store()

def get_all_documents() -> list[DocumentResponse]:
    return [DocumentResponse(**d) for d in _DOCUMENTS_STORE.values()]

def add_document(doc_data: dict, events: list[TimelineEvent]) -> DocumentResponse:
    doc_entry = {
        "id": doc_data["id"],
        "filename": doc_data["filename"],
        "upload_date": datetime.utcnow().isoformat(),
        "size_bytes": doc_data["size_bytes"],
        "event_count": len(events),
        "status": "processed"
    }
    _DOCUMENTS_STORE[doc_data["id"]] = doc_entry
    _EVENTS_STORE.extend(events)
    return DocumentResponse(**doc_entry)

def delete_document(doc_id: str) -> bool:
    global _EVENTS_STORE
    if doc_id in _DOCUMENTS_STORE:
        del _DOCUMENTS_STORE[doc_id]
        _EVENTS_STORE = [e for e in _EVENTS_STORE if e.document_id != doc_id]
        return True
    return False

def get_all_events() -> list[TimelineEvent]:
    return _EVENTS_STORE

def get_all_deadlines():
    return detect_deadlines_from_events(_EVENTS_STORE)

def get_all_conflicts():
    return detect_conflicts(_EVENTS_STORE)

def get_all_gaps():
    return detect_missing_documents(_EVENTS_STORE, _DOCUMENTS_STORE)

def update_event_review_status(event_id: str, new_status: str) -> bool:
    for e in _EVENTS_STORE:
        if e.id == event_id:
            e.review_status = new_status
            return True
    return False

def get_dashboard_metrics() -> DashboardStats:
    deadlines = get_all_deadlines()
    conflicts = get_all_conflicts()
    gaps = get_all_gaps()
    return DashboardStats(
        total_documents=len(_DOCUMENTS_STORE),
        total_events=len(_EVENTS_STORE),
        active_deadlines=len(deadlines),
        detected_conflicts=len(conflicts),
        missing_records=len(gaps)
    )
