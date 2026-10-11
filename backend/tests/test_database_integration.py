import os
import uuid
import pytest
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.models import Case, Document, TimelineEvent as TimelineEventModel, EventEvidence, Deadline
from main import app
from schemas import TimelineEvent
from services.review_service import (
    initialize_sample_store,
    get_all_documents,
    add_document,
    delete_document,
    get_all_events,
    update_event_review_status,
    get_all_deadlines,
    get_all_conflicts,
    get_all_gaps,
    get_dashboard_metrics,
    get_or_create_default_case,
)


@pytest.fixture
def isolated_db():
    """Provides an isolated in-memory SQLite database session with enforced foreign keys."""
    test_engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(test_engine, "connect")
    def enable_foreign_keys(dbapi_connection, _):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=test_engine)
    TestingSessionLocal = sessionmaker(
        bind=test_engine, autoflush=False, expire_on_commit=False
    )
    session = TestingSessionLocal()
    initialize_sample_store(db=session, force=True)

    try:
        yield session, TestingSessionLocal, test_engine
    finally:
        session.close()
        Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def client(isolated_db):
    """Provides a TestClient with the database dependency overridden to the isolated DB."""
    session, _, _ = isolated_db

    def override_get_db():
        try:
            yield session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    test_client = TestClient(app)
    try:
        yield test_client
    finally:
        app.dependency_overrides.clear()


def test_database_initialization_and_session(isolated_db):
    session, _, _ = isolated_db
    case = get_or_create_default_case(session)
    assert case is not None
    assert case.id is not None
    docs = get_all_documents(db=session)
    assert len(docs) >= 3


def test_document_creation_and_retrieval(isolated_db):
    session, _, _ = isolated_db
    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    doc_data = {
        "id": doc_id,
        "filename": "test_motion.txt",
        "size_bytes": 2048,
    }
    events = [
        TimelineEvent(
            id=f"evt_{uuid.uuid4().hex[:8]}",
            date="2024-07-10",
            raw_date_text="July 10, 2024",
            title="Motion to Compel Filed",
            description="Plaintiff filed motion to compel discovery.",
            document_id=doc_id,
            document_name="test_motion.txt",
            source_snippet="Motion filed July 10, 2024",
            confidence_score=0.95,
            review_status="pending",
            is_deadline=False,
        )
    ]

    res = add_document(doc_data, events, db=session)
    assert res.id == doc_id
    assert res.filename == "test_motion.txt"
    assert res.size_bytes == 2048
    assert res.event_count == 1
    assert res.status == "processed"

    all_docs = get_all_documents(db=session)
    matching = [d for d in all_docs if d.id == doc_id]
    assert len(matching) == 1
    assert matching[0].event_count == 1


def test_timeline_event_persistence(isolated_db):
    session, _, _ = isolated_db
    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    evt_id = f"evt_{uuid.uuid4().hex[:8]}"
    doc_data = {"id": doc_id, "filename": "filing.txt", "size_bytes": 100}
    events = [
        TimelineEvent(
            id=evt_id,
            date="2024-08-01",
            raw_date_text="August 1, 2024",
            title="Discovery Cutoff",
            description="All expert discovery cutoff deadline.",
            document_id=doc_id,
            document_name="filing.txt",
            source_snippet="Expert cutoff on August 1, 2024",
            confidence_score=0.99,
            review_status="pending",
            is_deadline=True,
        )
    ]
    add_document(doc_data, events, db=session)

    all_events = get_all_events(db=session)
    matched = [e for e in all_events if e.id == evt_id]
    assert len(matched) == 1
    assert matched[0].date == "2024-08-01"
    assert matched[0].title == "Discovery Cutoff"
    assert matched[0].is_deadline is True


def test_review_status_update_across_sessions(isolated_db):
    session1, session_factory, _ = isolated_db
    event_id = "evt_101"

    # Verify initial status
    ev1 = session1.get(TimelineEventModel, event_id)
    assert ev1 is not None

    # Update in first session
    updated = update_event_review_status(event_id, "flagged", db=session1)
    assert updated is True

    # Open completely separate second session
    session2 = session_factory()
    try:
        ev2 = session2.get(TimelineEventModel, event_id)
        assert ev2.review_status == "flagged"

        # Update again in second session
        update_event_review_status(event_id, "verified", db=session2)
    finally:
        session2.close()

    # Re-check in third session
    session3 = session_factory()
    try:
        ev3 = session3.get(TimelineEventModel, event_id)
        assert ev3.review_status == "verified"
    finally:
        session3.close()


def test_timeline_search_and_document_filtering(isolated_db):
    session, _, _ = isolated_db

    # Test filtering by specific document
    court_events = get_all_events(db=session, doc_id="doc_court_order")
    assert len(court_events) >= 2
    for e in court_events:
        assert e.document_id == "doc_court_order"

    # Test search by title / keyword
    injunction_events = get_all_events(db=session, search="injunction")
    assert len(injunction_events) >= 1
    for e in injunction_events:
        assert (
            "injunction" in e.title.lower()
            or "injunction" in e.description.lower()
            or "injunction" in e.source_snippet.lower()
        )

    # Search with nonexistent term
    none_events = get_all_events(db=session, search="nonexistent_xyz_term")
    assert len(none_events) == 0


def test_document_deletion_and_evidence_cleanup(isolated_db):
    session, _, _ = isolated_db
    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    evt_id = f"evt_{uuid.uuid4().hex[:8]}"

    doc_data = {"id": doc_id, "filename": "temp_delete.txt", "size_bytes": 500}
    events = [
        TimelineEvent(
            id=evt_id,
            date="2024-09-01",
            raw_date_text="September 1, 2024",
            title="Temporary Event",
            description="Event to be cleaned up.",
            document_id=doc_id,
            document_name="temp_delete.txt",
            source_snippet="Temporary snippet",
            confidence_score=0.9,
            review_status="pending",
            is_deadline=False,
        )
    ]
    add_document(doc_data, events, db=session)

    # Verify added
    assert session.get(Document, doc_id) is not None
    assert session.get(TimelineEventModel, evt_id) is not None
    evidence_count = session.query(EventEvidence).filter(EventEvidence.document_id == doc_id).count()
    assert evidence_count == 1

    # Delete document
    deleted = delete_document(doc_id, db=session)
    assert deleted is True

    # Document and evidence should be gone
    assert session.get(Document, doc_id) is None
    assert session.query(EventEvidence).filter(EventEvidence.document_id == doc_id).count() == 0
    # Orphan event was also cleaned up
    assert session.get(TimelineEventModel, evt_id) is None


def test_dashboard_statistics(isolated_db):
    session, _, _ = isolated_db
    stats = get_dashboard_metrics(db=session)

    assert stats.total_documents >= 3
    assert stats.total_events >= 5
    assert stats.active_deadlines >= 2
    assert stats.detected_conflicts >= 1


def test_api_compatibility_endpoints(client):
    # GET /api/documents
    res_docs = client.get("/api/documents")
    assert res_docs.status_code == 200
    docs_data = res_docs.json()
    assert isinstance(docs_data, list)
    assert len(docs_data) >= 3
    first_doc = docs_data[0]
    for key in ["id", "filename", "upload_date", "size_bytes", "event_count", "status"]:
        assert key in first_doc

    # GET /api/analysis/stats
    res_stats = client.get("/api/analysis/stats")
    assert res_stats.status_code == 200
    stats_data = res_stats.json()
    for key in ["total_documents", "total_events", "active_deadlines", "detected_conflicts", "missing_records"]:
        assert key in stats_data

    # GET /api/analysis/timeline
    res_timeline = client.get("/api/analysis/timeline")
    assert res_timeline.status_code == 200
    timeline_data = res_timeline.json()
    assert isinstance(timeline_data, list)
    assert len(timeline_data) >= 5

    # Filtered timeline
    res_filtered = client.get("/api/analysis/timeline?search=hearing")
    assert res_filtered.status_code == 200
    assert len(res_filtered.json()) >= 1

    # GET /api/analysis/deadlines
    res_deadlines = client.get("/api/analysis/deadlines")
    assert res_deadlines.status_code == 200
    assert isinstance(res_deadlines.json(), list)

    # GET /api/analysis/conflicts
    res_conflicts = client.get("/api/analysis/conflicts")
    assert res_conflicts.status_code == 200
    assert isinstance(res_conflicts.json(), list)

    # GET /api/analysis/gaps
    res_gaps = client.get("/api/analysis/gaps")
    assert res_gaps.status_code == 200
    assert isinstance(res_gaps.json(), list)

    # POST /api/analysis/review-status
    res_status = client.post(
        "/api/analysis/review-status",
        json={"event_id": "evt_101", "status": "flagged"},
    )
    assert res_status.status_code == 200
    assert res_status.json()["success"] is True

    # Check updated status on timeline
    res_check = client.get("/api/analysis/timeline")
    evt_check = [e for e in res_check.json() if e["id"] == "evt_101"][0]
    assert evt_check["review_status"] == "flagged"

    # GET /api/export/report
    res_report = client.get("/api/export/report")
    assert res_report.status_code == 200
    assert "CaseCompass" in res_report.text

    # GET /api/export/csv
    res_csv = client.get("/api/export/csv")
    assert res_csv.status_code == 200
    assert "text/csv" in res_csv.headers["content-type"]
