
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Case, Document


def create_document(
    db: Session,
    *,
    case_id: str,
    filename: str,
    content_type: str | None = None,
    processing_status: str = "pending",
) -> Document | None:
    if db.get(Case, case_id) is None:
        return None

    document = Document(
        case_id=case_id,
        filename=filename,
        content_type=content_type,
        processing_status=processing_status,
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return document


def get_document(db: Session, document_id: str) -> Document | None:
    return db.get(Document, document_id)


def list_documents(
    db: Session, *, case_id: str, limit: int = 100, offset: int = 0
) -> list[Document]:
    stmt = (
        select(Document)
        .where(Document.case_id == case_id)
        .order_by(Document.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    return list(db.scalars(stmt).all())


def update_document(
    db: Session,
    document_id: str,
    *,
    filename: str | None = None,
    content_type: str | None = None,
    processing_status: str | None = None,
) -> Document | None:
    document = db.get(Document, document_id)
    if document is None:
        return None

    if filename is not None:
        document.filename = filename
    if content_type is not None:
        document.content_type = content_type
    if processing_status is not None:
        document.processing_status = processing_status

    db.commit()
    db.refresh(document)
    return document


def delete_document(db: Session, document_id: str) -> bool:
    document = db.get(Document, document_id)
    if document is None:
        return False

    db.delete(document)
    db.commit()
    return True
