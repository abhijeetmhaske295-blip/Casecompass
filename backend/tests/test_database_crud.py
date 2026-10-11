from app.crud.event_evidence import delete_event_evidence
from app.crud.timeline_events import delete_timeline_event
from app.crud.documents import delete_document
from app.crud.event_evidence import get_event_evidence
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
from datetime import date

from app.crud.documents import (
    list_documents,
    update_document,
    delete_document,
)
from app.crud.timeline_events import (
    list_timeline_events,
    update_timeline_event,
    delete_timeline_event,
)
from app.crud.deadlines import (
    list_deadlines,
    update_deadline,
    delete_deadline,
)
from app.crud.issues import (
    list_issues,
    update_issue,
    delete_issue,
)


def test_document_list_update_delete(db):
    case = create_case(db, title="Document case")
    first = create_document(
        db, case_id=case.id, filename="first.pdf"
    )
    second = create_document(
        db, case_id=case.id, filename="second.pdf"
    )

    assert len(list_documents(db, case_id=case.id)) == 2

    updated = update_document(
        db,
        first.id,
        filename="updated.pdf",
        processing_status="processed",
    )
    assert updated.filename == "updated.pdf"
    assert updated.processing_status == "processed"

    assert delete_document(db, second.id) is True
    assert delete_document(db, second.id) is False
    assert [item.id for item in list_documents(
        db, case_id=case.id
    )] == [first.id]


def test_timeline_event_list_update_delete(db):
    case = create_case(db, title="Timeline case")
    earlier = create_timeline_event(
        db,
        case_id=case.id,
        title="Earlier event",
        normalized_date=date(2026, 1, 10),
    )
    later = create_timeline_event(
        db,
        case_id=case.id,
        title="Later event",
        normalized_date=date(2026, 2, 10),
    )
    undated = create_timeline_event(
        db, case_id=case.id, title="Undated event"
    )

    items = list_timeline_events(db, case_id=case.id)
    assert [item.id for item in items] == [
        earlier.id, later.id, undated.id
    ]

    updated = update_timeline_event(
        db, earlier.id, title="Updated event",
        review_status="reviewed",
    )
    assert updated.title == "Updated event"
    assert updated.review_status == "reviewed"

    assert delete_timeline_event(db, later.id) is True
    assert delete_timeline_event(db, later.id) is False


def test_deadline_list_update_delete(db):
    case = create_case(db, title="Deadline case")
    dated = create_deadline(
        db,
        case_id=case.id,
        title="Dated deadline",
        normalized_date=date(2026, 3, 1),
    )
    undated = create_deadline(
        db, case_id=case.id, title="Undated deadline"
    )

    items = list_deadlines(db, case_id=case.id)
    assert [item.id for item in items] == [dated.id, undated.id]

    updated = update_deadline(
        db, dated.id, title="Updated deadline",
        review_status="reviewed",
    )
    assert updated.title == "Updated deadline"
    assert updated.review_status == "reviewed"

    assert delete_deadline(db, undated.id) is True
    assert delete_deadline(db, undated.id) is False


def test_issue_list_update_delete(db):
    case = create_case(db, title="Issue case")
    first = create_issue(
        db,
        case_id=case.id,
        issue_type="missing_document",
        description="A document is missing.",
    )
    second = create_issue(
        db,
        case_id=case.id,
        issue_type="date_conflict",
        description="Two dates differ.",
    )

    assert len(list_issues(db, case_id=case.id)) == 2

    updated = update_issue(
        db, first.id, status="resolved",
        description="Document was supplied.",
    )
    assert updated.status == "resolved"
    assert updated.description == "Document was supplied."

    assert delete_issue(db, second.id) is True
    assert delete_issue(db, second.id) is False


def test_list_operations_are_scoped_to_case(db):
    case_one = create_case(db, title="First case")
    case_two = create_case(db, title="Second case")

    create_document(db, case_id=case_one.id, filename="one.pdf")
    create_document(db, case_id=case_two.id, filename="two.pdf")

    assert len(list_documents(db, case_id=case_one.id)) == 1
    assert len(list_documents(db, case_id=case_two.id)) == 1

    assert list_documents(db, case_id="missing-case") == []


def test_document_list_pagination(db):
    case = create_case(db, title="Pagination case")
    for index in range(3):
        create_document(
            db,
            case_id=case.id,
            filename=f"document-{index}.pdf",
        )

    first_page = list_documents(
        db, case_id=case.id, limit=2, offset=0
    )
    second_page = list_documents(
        db, case_id=case.id, limit=2, offset=2
    )

    assert len(first_page) == 2
    assert len(second_page) == 1
    assert first_page[0].id != second_page[0].id
def test_deleting_document_removes_its_evidence(db):
    case = create_case(db, title="Document deletion case")
    document = create_document(
        db, case_id=case.id, filename="source.pdf"
    )
    event_item = create_timeline_event(
        db, case_id=case.id, title="Hearing"
    )
    evidence = create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document.id,
        quote="The hearing is scheduled.",
    )

    assert evidence is not None
    assert delete_document(db, document.id) is True
    assert get_event_evidence(db, evidence.id) is None
    assert get_timeline_event(db, event_item.id) is not None


def test_deleting_event_removes_its_evidence(db):
    case = create_case(db, title="Event deletion case")
    document = create_document(
        db, case_id=case.id, filename="source.pdf"
    )
    event_item = create_timeline_event(
        db, case_id=case.id, title="Hearing"
    )
    evidence = create_event_evidence(
        db,
        event_id=event_item.id,
        document_id=document.id,
        quote="The hearing is scheduled.",
    )

    assert evidence is not None
    assert delete_timeline_event(db, event_item.id) is True
    assert get_event_evidence(db, evidence.id) is None
    assert get_document(db, document.id) is not None