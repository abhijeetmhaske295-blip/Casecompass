
from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Case, TimelineEvent


def create_timeline_event(
    db: Session,
    *,
    case_id: str,
    title: str,
    description: str | None = None,
    date_text: str | None = None,
    normalized_date: date | None = None,
    date_status: str = "unknown",
    confidence: float | None = None,
    review_status: str = "pending",
) -> TimelineEvent | None:
    if db.get(Case, case_id) is None:
        return None

    event = TimelineEvent(
        case_id=case_id,
        title=title,
        description=description,
        date_text=date_text,
        normalized_date=normalized_date,
        date_status=date_status,
        confidence=confidence,
        review_status=review_status,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_timeline_event(db: Session, event_id: str) -> TimelineEvent | None:
    return db.get(TimelineEvent, event_id)


def list_timeline_events(
    db: Session, *, case_id: str, limit: int = 100, offset: int = 0
) -> list[TimelineEvent]:
    stmt = (
        select(TimelineEvent)
        .where(TimelineEvent.case_id == case_id)
        .order_by(
            TimelineEvent.normalized_date.asc().nulls_last(),
            TimelineEvent.created_at.asc(),
        )
        .offset(offset)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def update_timeline_event(
    db: Session,
    event_id: str,
    *,
    title: str | None = None,
    description: str | None = None,
    date_text: str | None = None,
    normalized_date: date | None = None,
    date_status: str | None = None,
    review_status: str | None = None,
) -> TimelineEvent | None:
    event = db.get(TimelineEvent, event_id)
    if event is None:
        return None

    for field, value in {
        "title": title,
        "description": description,
        "date_text": date_text,
        "normalized_date": normalized_date,
        "date_status": date_status,
        "review_status": review_status,
    }.items():
        if value is not None:
            setattr(event, field, value)

    db.commit()
    db.refresh(event)
    return event


def delete_timeline_event(db: Session, event_id: str) -> bool:
    event = db.get(TimelineEvent, event_id)
    if event is None:
        return False

    db.delete(event)
    db.commit()
    return True
