
import sys
from pathlib import Path

import pytest
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from app.core.database import Base
from app.models import Case, Document, TimelineEvent, EventEvidence, Deadline, Issue
from app.crud.cases import create_case, get_case, update_case, delete_case
from app.crud.documents import create_document, get_document
from app.crud.timeline_events import create_timeline_event, get_timeline_event
from app.crud.deadlines import create_deadline, get_deadline
from app.crud.issues import create_issue, get_issue
from app.crud.event_evidence import create_event_evidence, list_event_evidence


@pytest.fixture
def db():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )

    @event.listens_for(engine, "connect")
    def enable_foreign_keys(connection, _):
        cursor = connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()

    Base.metadata.create_all(bind=engine)

    TestingSession = sessionmaker(
        bind=engine,
        autoflush=False,
        expire_on_commit=False,
    )
    session = TestingSession()

    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


def test_case_create_update_delete(db):
    case = create_case(
        db, title="Sample case", description="Test record"
    )
    assert case.id
    assert get_case(db, case.id).title == "Sample case"

    updated = update_case(db, case.id, title="Updated case")
    assert updated.title == "Updated case"

    assert delete_case(db, case.id) is True
    assert get_case(db, case.id) is None
    assert delete_case(db, case.id) is False


def test_document_requires_existing_case(db):
    assert create_document(
        db, case_id="missing", filename="notice.txt"
    ) is None

    case = create_case(db, title="Sample case")
    document = create_document(
        db,
        case_id=case.id,
        filename="notice.txt",
        content_type="text/plain",
    )

    assert document is not None
    assert get_document(db, document.id).case_id == case.id


def test_event_and_multi_document_evidence(db):
    case = create_case(db, title="Sample case")
    document_one = create_document(
        db, case_id=case.id, filename="notice-one.txt"
    )
    document_two = create_document(
        db, case_id=case.id, filename="notice-two.txt"
    )

    event_item = create_timeline_event(
        db,
        case_id=case.id,
        title="Hearing scheduled",
        date_text="October 15, 2026",
        date_status="confirmed",
    )
    assert event_item is not None
    assert get_timeline_event(db, event_item.id) is not None

    first = create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document_one.id,
        page_number=1,
        quote="The hearing is scheduled for October 15, 2026.",
    )
    second = create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document_two.id,
        page_number=2,
        quote="The hearing date is October 15, 2026.",
    )

    assert first is not None
    assert second is not None
    evidence_items = list_event_evidence(db, event_id=event_item.id)
    assert len(evidence_items) == 2
    assert {item.document_id for item in evidence_items} == {
        document_one.id,
        document_two.id,
    }


def test_evidence_rejects_document_from_another_case(db):
    case_one = create_case(db, title="Case one")
    case_two = create_case(db, title="Case two")

    document = create_document(
        db, case_id=case_two.id, filename="other.txt"
    )
    event_item = create_timeline_event(
        db, case_id=case_one.id, title="Event"
    )

    assert create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document.id,
        quote="Unrelated evidence",
    ) is None


def test_undated_deadline_stays_undated(db):
    case = create_case(db, title="Sample case")
    deadline = create_deadline(
        db,
        case_id=case.id,
        title="Filing deadline",
        date_text="Date not specified",
        date_status="missing",
    )

    assert deadline is not None
    assert deadline.normalized_date is None
    assert deadline.date_status == "missing"
    assert get_deadline(db, deadline.id) is not None


def test_issue_stores_structured_evidence(db):
    case = create_case(db, title="Sample case")
    issue = create_issue(
        db,
        case_id=case.id,
        issue_type="missing_document",
        description="A referenced document was not supplied.",
        evidence={"filename": "referenced_notice.pdf", "page": 2},
    )

    assert issue is not None
    saved_issue = get_issue(db, issue.id)
    assert saved_issue.evidence["filename"] == "referenced_notice.pdf"
    assert saved_issue.evidence["page"] == 2


def test_deleting_case_cascades_related_records(db):
    case = create_case(db, title="Case to delete")
    document = create_document(
        db, case_id=case.id, filename="notice.txt"
    )
    event_item = create_timeline_event(
        db, case_id=case.id, title="Event"
    )
    create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document.id,
        quote="Source text",
    )
    create_deadline(
        db, case_id=case.id, title="Deadline"
    )
    create_issue(
        db,
        case_id=case.id,
        issue_type="missing_document",
        description="Missing document",
    )

    assert delete_case(db, case.id) is True
    assert get_document(db, document.id) is None
    assert get_timeline_event(db, event_item.id) is None
