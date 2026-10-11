
from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Case, Deadline, Document


def create_deadline(
    db: Session,
    *,
    case_id: str,
    title: str,
    document_id: str | None = None,
    description: str | None = None,
    date_text: str | None = None,
    normalized_date: date | None = None,
    date_status: str = "unknown",
    review_status: str = "pending",
) -> Deadline | None:
    if db.get(Case, case_id) is None:
        return None
    if document_id is not None:
        document = db.get(Document, document_id)
        if document is None or document.case_id != case_id:
            return None

    item = Deadline(
        case_id=case_id,
        document_id=document_id,
        title=title,
        description=description,
        date_text=date_text,
        normalized_date=normalized_date,
        date_status=date_status,
        review_status=review_status,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def get_deadline(db: Session, deadline_id: str) -> Deadline | None:
    return db.get(Deadline, deadline_id)


def list_deadlines(
    db: Session, *, case_id: str, limit: int = 100, offset: int = 0
) -> list[Deadline]:
    stmt = (
        select(Deadline)
        .where(Deadline.case_id == case_id)
        .order_by(Deadline.normalized_date.asc().nulls_last())
        .offset(offset)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def update_deadline(
    db: Session,
    deadline_id: str,
    *,
    title: str | None = None,
    description: str | None = None,
    date_text: str | None = None,
    normalized_date: date | None = None,
    date_status: str | None = None,
    review_status: str | None = None,
) -> Deadline | None:
    item = db.get(Deadline, deadline_id)
    if item is None:
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
            setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


def delete_deadline(db: Session, deadline_id: str) -> bool:
    item = db.get(Deadline, deadline_id)
    if item is None:
        return False

    db.delete(item)
    db.commit()
    return True
