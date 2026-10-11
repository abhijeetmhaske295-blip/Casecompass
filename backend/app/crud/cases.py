
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Case


def create_case(
    db: Session, *, title: str, description: str | None = None
) -> Case:
    case = Case(title=title, description=description)
    db.add(case)
    db.commit()
    db.refresh(case)
    return case


def get_case(db: Session, case_id: str) -> Case | None:
    return db.get(Case, case_id)


def list_cases(db: Session, *, limit: int = 100, offset: int = 0) -> list[Case]:
    stmt = select(Case).order_by(Case.created_at.desc()).offset(offset).limit(limit)
    return list(db.scalars(stmt).all())


def update_case(
    db: Session,
    case_id: str,
    *,
    title: str | None = None,
    description: str | None = None,
) -> Case | None:
    case = db.get(Case, case_id)
    if case is None:
        return None

    if title is not None:
        case.title = title
    if description is not None:
        case.description = description

    db.commit()
    db.refresh(case)
    return case


def delete_case(db: Session, case_id: str) -> bool:
    case = db.get(Case, case_id)
    if case is None:
        return False

    db.delete(case)
    db.commit()
    return True
