
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Document, EventEvidence, TimelineEvent


def create_event_evidence(
    db: Session,
    *,
    event_id: str,
    document_id: str,
    quote: str,
    page_number: int | None = None,
) -> EventEvidence | None:
    event = db.get(TimelineEvent, event_id)
    document = db.get(Document, document_id)

    if event is None or document is None:
        return None
    if event.case_id != document.case_id:
        return None

    evidence = EventEvidence(
        event_id=event_id,
        document_id=document_id,
        quote=quote,
        page_number=page_number,
    )
    db.add(evidence)
    db.commit()
    db.refresh(evidence)
    return evidence


def get_event_evidence(
    db: Session, evidence_id: str
) -> EventEvidence | None:
    return db.get(EventEvidence, evidence_id)


def list_event_evidence(
    db: Session, *, event_id: str
) -> list[EventEvidence]:
    stmt = (
        select(EventEvidence)
        .where(EventEvidence.event_id == event_id)
        .order_by(EventEvidence.page_number.asc())
    )
    return list(db.scalars(stmt).all())


def delete_event_evidence(db: Session, evidence_id: str) -> bool:
    item = db.get(EventEvidence, evidence_id)
    if item is None:
        return False

    db.delete(item)
    db.commit()
    return True
