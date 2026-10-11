import os
import re
import uuid
from datetime import datetime, date
from typing import Optional, List

from sqlalchemy import select, or_
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, engine, Base
from app.models import (
    Case as CaseModel,
    Document as DocumentModel,
    TimelineEvent as TimelineEventModel,
    EventEvidence as EventEvidenceModel,
    Deadline as DeadlineModel,
    Issue as IssueModel,
)
from schemas import (
    DocumentResponse,
    TimelineEvent,
    DeadlineItem,
    ConflictItem,
    MissingDocumentAlert,
    DashboardStats,
)
from services.deadline_detector import detect_deadlines_from_events
from services.conflict_detector import detect_conflicts
from services.gap_detector import detect_missing_documents

DEFAULT_CASE_ID = "case_default"
DEFAULT_CASE_TITLE = "Apex Corp v. Horizon Dynamics (CV-2024-08912)"

_DOCUMENTS_STORE = {}
_EVENTS_STORE = []


def _get_session(db: Optional[Session] = None):
    if db is not None:
        return db, False
    return SessionLocal(), True


def get_or_create_default_case(db: Session, case_id: str = DEFAULT_CASE_ID) -> CaseModel:
    case = db.get(CaseModel, case_id)
    if case is None:
        case = CaseModel(
            id=case_id,
            title=DEFAULT_CASE_TITLE,
            description="Litigation case management and timeline intelligence",
        )
        db.add(case)
        db.commit()
        db.refresh(case)
    return case


def map_document_to_schema(doc: DocumentModel, event_count: int = 0) -> DocumentResponse:
    size_bytes = 1024
    if doc.content_type and "size=" in doc.content_type:
        try:
            size_bytes = int(doc.content_type.split("size=")[1].split(";")[0])
        except Exception:
            size_bytes = 1024

    return DocumentResponse(
        id=doc.id,
        filename=doc.filename,
        upload_date=doc.created_at.isoformat() if doc.created_at else datetime.utcnow().isoformat(),
        size_bytes=size_bytes,
        event_count=event_count,
        status=doc.processing_status,
    )


def map_timeline_event_to_schema(event: TimelineEventModel, db: Optional[Session] = None) -> TimelineEvent:
    doc_id = ""
    doc_name = "Unknown Document"
    snippet = ""

    if event.evidence:
        ev = event.evidence[0]
        doc_id = ev.document_id
        snippet = ev.quote or ""
        if ev.document:
            doc_name = ev.document.filename
        elif db:
            doc = db.get(DocumentModel, doc_id)
            if doc:
                doc_name = doc.filename

    date_str = event.normalized_date.isoformat() if event.normalized_date else None

    is_deadline = bool(
        re.search(
            r'deadline|shall complete|no later than|within \d+ days|scheduled for',
            event.description or "",
            re.IGNORECASE,
        )
        or re.search(r'deadline', event.title or "", re.IGNORECASE)
    )

    return TimelineEvent(
        id=event.id,
        date=date_str,
        raw_date_text=event.date_text or (date_str or ""),
        title=event.title,
        description=event.description or "",
        document_id=doc_id,
        document_name=doc_name,
        source_snippet=snippet,
        confidence_score=event.confidence if event.confidence is not None else 0.95,
        review_status=event.review_status,
        is_deadline=is_deadline,
    )


def initialize_sample_store(db: Optional[Session] = None, force: bool = False):
    session, should_close = _get_session(db)
    try:
        bind = session.get_bind()
        Base.metadata.create_all(bind=bind)
        case = get_or_create_default_case(session, DEFAULT_CASE_ID)

        existing = session.get(DocumentModel, "doc_court_order")
        if existing is not None and not force:
            return

        sample_docs = [
            ("doc_court_order", "court_order.txt", 1024),
            ("doc_hearing_notice", "hearing_notice.txt", 512),
            ("doc_affidavit", "conflicting_dates.txt", 620),
        ]
        for doc_id, filename, size_bytes in sample_docs:
            d = session.get(DocumentModel, doc_id)
            if not d:
                d = DocumentModel(
                    id=doc_id,
                    case_id=case.id,
                    filename=filename,
                    content_type=f"text/plain;size={size_bytes}",
                    processing_status="processed",
                )
                session.add(d)
        session.flush()

        raw_events = [
            (
                "evt_101",
                "2024-04-15",
                "April 15, 2024",
                "Preliminary Injunction Issued",
                "Court ordered Horizon Dynamics to immediately suspend distribution of Version 4.2 software.",
                "doc_court_order",
                "Date of Order: April 15, 2024. Defendant shall suspend distribution effective immediately.",
                0.98,
                "verified",
                False,
            ),
            (
                "evt_102",
                "2024-04-19",
                "April 19, 2024",
                "Injunction Received Claimed by Witness",
                "Witness Sarah Lin asserts preliminary injunction was only received on April 19, 2024.",
                "doc_affidavit",
                "The preliminary injunction was received by our office on April 19, 2024, not April 15, 2024.",
                0.94,
                "flagged",
                False,
            ),
            (
                "evt_103",
                "2024-05-15",
                "May 15, 2024",
                "Initial Disclosures & Motions Deadline",
                "The parties shall complete initial disclosures and discovery motions no later than May 15, 2024.",
                "doc_court_order",
                "The parties shall complete initial disclosures no later than May 15, 2024.",
                0.99,
                "verified",
                True,
            ),
            (
                "evt_104",
                "2024-06-01",
                "June 01, 2024",
                "Witness List Submission Deadline",
                "Failure to submit witness lists by June 01, 2024 will result in forfeiture of testimony.",
                "doc_hearing_notice",
                "Failure to submit witness lists by June 01, 2024 will result in forfeiture of testimony.",
                0.97,
                "pending",
                True,
            ),
            (
                "evt_105",
                "2024-06-22",
                "June 22, 2024 at 10:00 AM",
                "Formal Evidentiary Hearing",
                "Evidentiary hearing set for June 22, 2024 at 10:00 AM in Courtroom 4B.",
                "doc_hearing_notice",
                "Evidentiary hearing regarding Case CV-2024-08912 has been set for June 22, 2024 at 10:00 AM.",
                0.99,
                "verified",
                False,
            ),
        ]

        for eid, dt, raw_dt, title, desc, doc_id, snippet, conf, rev_status, is_deadline in raw_events:
            ev = session.get(TimelineEventModel, eid)
            parsed_d = datetime.strptime(dt, "%Y-%m-%d").date() if dt else None
            if not ev:
                ev = TimelineEventModel(
                    id=eid,
                    case_id=case.id,
                    title=title,
                    description=desc,
                    date_text=raw_dt,
                    normalized_date=parsed_d,
                    date_status="exact" if parsed_d else "unknown",
                    confidence=conf,
                    review_status=rev_status,
                )
                session.add(ev)
                session.flush()

            evidence_id = f"ev_{eid}"
            evidence = session.get(EventEvidenceModel, evidence_id)
            if not evidence:
                evidence = EventEvidenceModel(
                    id=evidence_id,
                    event_id=eid,
                    document_id=doc_id,
                    quote=snippet,
                    page_number=1,
                )
                session.add(evidence)

            if is_deadline:
                dl_id = f"dl_{eid}"
                dl = session.get(DeadlineModel, dl_id)
                if not dl:
                    dl = DeadlineModel(
                        id=dl_id,
                        case_id=case.id,
                        document_id=doc_id,
                        title=title,
                        description=desc,
                        date_text=raw_dt,
                        normalized_date=parsed_d,
                        date_status="exact" if parsed_d else "unknown",
                        review_status=rev_status,
                    )
                    session.add(dl)

        session.commit()
    finally:
        if should_close:
            session.close()


def get_all_documents(
    db: Optional[Session] = None, case_id: Optional[str] = None
) -> List[DocumentResponse]:
    session, should_close = _get_session(db)
    try:
        stmt = select(DocumentModel)
        if case_id:
            stmt = stmt.where(DocumentModel.case_id == case_id)
        stmt = stmt.order_by(DocumentModel.created_at.desc())
        docs = list(session.scalars(stmt).all())

        results = []
        for d in docs:
            count_stmt = select(EventEvidenceModel).where(
                EventEvidenceModel.document_id == d.id
            )
            ev_count = len(session.scalars(count_stmt).all())
            schema_doc = map_document_to_schema(d, event_count=ev_count)
            results.append(schema_doc)
            _DOCUMENTS_STORE[d.id] = schema_doc.model_dump()
        return results
    finally:
        if should_close:
            session.close()


def add_document(
    doc_data: dict,
    events: List[TimelineEvent],
    db: Optional[Session] = None,
    case_id: Optional[str] = None,
) -> DocumentResponse:
    session, should_close = _get_session(db)
    try:
        case = get_or_create_default_case(session, case_id or DEFAULT_CASE_ID)

        doc = session.get(DocumentModel, doc_data["id"])
        if doc is None:
            doc = DocumentModel(
                id=doc_data["id"],
                case_id=case.id,
                filename=doc_data["filename"],
                content_type=f"text/plain;size={doc_data.get('size_bytes', 0)}",
                processing_status="processed",
            )
            session.add(doc)
            session.flush()

        for e in events:
            norm_date = None
            if e.date:
                try:
                    norm_date = datetime.strptime(e.date, "%Y-%m-%d").date()
                except Exception:
                    norm_date = None

            t_event = session.get(TimelineEventModel, e.id)
            if t_event is None:
                t_event = TimelineEventModel(
                    id=e.id,
                    case_id=case.id,
                    title=e.title,
                    description=e.description,
                    date_text=e.raw_date_text,
                    normalized_date=norm_date,
                    date_status="exact" if norm_date else ("missing" if not e.raw_date_text else "unknown"),
                    confidence=e.confidence_score,
                    review_status=e.review_status or "pending",
                )
                session.add(t_event)
                session.flush()

            ev_id = f"ev_{e.id}"
            ev = session.get(EventEvidenceModel, ev_id)
            if ev is None:
                ev = EventEvidenceModel(
                    id=ev_id,
                    event_id=e.id,
                    document_id=doc_data["id"],
                    quote=e.source_snippet or "",
                    page_number=1,
                )
                session.add(ev)

            if e.is_deadline:
                dl_id = f"dl_{e.id}"
                dl = session.get(DeadlineModel, dl_id)
                if dl is None:
                    dl = DeadlineModel(
                        id=dl_id,
                        case_id=case.id,
                        document_id=doc_data["id"],
                        title=e.title,
                        description=e.description,
                        date_text=e.raw_date_text,
                        normalized_date=norm_date,
                        date_status="exact" if norm_date else "unknown",
                        review_status=e.review_status or "pending",
                    )
                    session.add(dl)

        session.commit()
        session.refresh(doc)
        schema_doc = map_document_to_schema(doc, event_count=len(events))
        _DOCUMENTS_STORE[doc.id] = schema_doc.model_dump()
        return schema_doc
    finally:
        if should_close:
            session.close()


def delete_document(doc_id: str, db: Optional[Session] = None) -> bool:
    session, should_close = _get_session(db)
    try:
        doc = session.get(DocumentModel, doc_id)
        if doc is None:
            return False

        evidence_items = list(
            session.scalars(
                select(EventEvidenceModel).where(
                    EventEvidenceModel.document_id == doc_id
                )
            ).all()
        )
        event_ids = [ev.event_id for ev in evidence_items]

        session.query(EventEvidenceModel).filter(
            EventEvidenceModel.document_id == doc_id
        ).delete(synchronize_session="fetch")

        for eid in event_ids:
            remaining_evidence_count = session.query(EventEvidenceModel).filter(
                EventEvidenceModel.event_id == eid
            ).count()
            if remaining_evidence_count == 0:
                event_item = session.get(TimelineEventModel, eid)
                if event_item:
                    session.delete(event_item)

        session.query(DeadlineModel).filter(
            DeadlineModel.document_id == doc_id
        ).delete(synchronize_session="fetch")

        session.delete(doc)
        session.commit()

        if doc_id in _DOCUMENTS_STORE:
            del _DOCUMENTS_STORE[doc_id]
        return True
    finally:
        if should_close:
            session.close()


def get_all_events(
    db: Optional[Session] = None,
    search: Optional[str] = None,
    doc_id: Optional[str] = None,
    case_id: Optional[str] = None,
) -> List[TimelineEvent]:
    session, should_close = _get_session(db)
    try:
        stmt = select(TimelineEventModel)
        if case_id:
            stmt = stmt.where(TimelineEventModel.case_id == case_id)

        if doc_id:
            stmt = stmt.join(TimelineEventModel.evidence).where(
                EventEvidenceModel.document_id == doc_id
            )

        if search:
            search_pattern = f"%{search}%"
            stmt = stmt.where(
                or_(
                    TimelineEventModel.title.ilike(search_pattern),
                    TimelineEventModel.description.ilike(search_pattern),
                )
            )

        stmt = stmt.order_by(
            TimelineEventModel.normalized_date.asc().nulls_last(),
            TimelineEventModel.created_at.asc(),
        )

        events_models = list(session.scalars(stmt).all())
        schema_events = [map_timeline_event_to_schema(e, session) for e in events_models]

        if search:
            search_lower = search.lower()
            if not schema_events:
                all_raw_models = list(session.scalars(select(TimelineEventModel)).all())
                schema_events = [
                    map_timeline_event_to_schema(e, session)
                    for e in all_raw_models
                    if search_lower in (e.title or "").lower()
                    or search_lower in (e.description or "").lower()
                    or any(search_lower in (ev.quote or "").lower() for ev in e.evidence)
                ]
                if doc_id:
                    schema_events = [e for e in schema_events if e.document_id == doc_id]
                schema_events.sort(key=lambda x: x.date or "9999-99-99")

        global _EVENTS_STORE
        _EVENTS_STORE = schema_events
        return schema_events
    finally:
        if should_close:
            session.close()


def update_event_review_status(
    event_id: str, new_status: str, db: Optional[Session] = None
) -> bool:
    session, should_close = _get_session(db)
    try:
        event = session.get(TimelineEventModel, event_id)
        if event is None:
            return False
        event.review_status = new_status
        session.commit()
        return True
    finally:
        if should_close:
            session.close()


def get_all_deadlines(db: Optional[Session] = None) -> List[DeadlineItem]:
    events = get_all_events(db=db)
    return detect_deadlines_from_events(events)


def get_all_conflicts(db: Optional[Session] = None) -> List[ConflictItem]:
    events = get_all_events(db=db)
    return detect_conflicts(events)


def get_all_gaps(db: Optional[Session] = None) -> List[MissingDocumentAlert]:
    events = get_all_events(db=db)
    docs = get_all_documents(db=db)
    docs_dict = {d.id: d for d in docs}
    return detect_missing_documents(events, docs_dict)


def get_dashboard_metrics(db: Optional[Session] = None) -> DashboardStats:
    session, should_close = _get_session(db)
    try:
        docs = get_all_documents(db=session)
        events = get_all_events(db=session)
        deadlines = get_all_deadlines(db=session)
        conflicts = get_all_conflicts(db=session)
        gaps = get_all_gaps(db=session)

        return DashboardStats(
            total_documents=len(docs),
            total_events=len(events),
            active_deadlines=len(deadlines),
            detected_conflicts=len(conflicts),
            missing_records=len(gaps),
        )
    finally:
        if should_close:
            session.close()


# Ensure tables and initial store are prepared idempotently
initialize_sample_store()
