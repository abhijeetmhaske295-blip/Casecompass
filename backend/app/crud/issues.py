
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Case, Issue


def create_issue(
    db: Session,
    *,
    case_id: str,
    issue_type: str,
    description: str,
    evidence: dict[str, Any] | list[Any] | None = None,
    status: str = "open",
) -> Issue | None:
    if db.get(Case, case_id) is None:
        return None

    item = Issue(
        case_id=case_id,
        issue_type=issue_type,
        description=description,
        evidence=evidence,
        status=status,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def get_issue(db: Session, issue_id: str) -> Issue | None:
    return db.get(Issue, issue_id)


def list_issues(
    db: Session, *, case_id: str, limit: int = 100, offset: int = 0
) -> list[Issue]:
    stmt = (
        select(Issue)
        .where(Issue.case_id == case_id)
        .order_by(Issue.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def update_issue(
    db: Session,
    issue_id: str,
    *,
    issue_type: str | None = None,
    description: str | None = None,
    evidence: dict[str, Any] | list[Any] | None = None,
    status: str | None = None,
) -> Issue | None:
    item = db.get(Issue, issue_id)
    if item is None:
        return None

    for field, value in {
        "issue_type": issue_type,
        "description": description,
        "evidence": evidence,
        "status": status,
    }.items():
        if value is not None:
            setattr(item, field, value)

    db.commit()
    db.refresh(item)
    return item


def delete_issue(db: Session, issue_id: str) -> bool:
    item = db.get(Issue, issue_id)
    if item is None:
        return False

    db.delete(item)
    db.commit()
    return True
