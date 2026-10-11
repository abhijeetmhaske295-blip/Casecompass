from typing import List, Optional

from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db

from schemas import (
    TimelineEvent,
    DeadlineItem,
    ConflictItem,
    MissingDocumentAlert,
    ReviewStatusUpdate,
    DashboardStats,
)
from services.review_service import (
    get_all_events,
    get_all_deadlines,
    get_all_conflicts,
    get_all_gaps,
    update_event_review_status,
    get_dashboard_metrics,
)

router = APIRouter()


@router.get("/stats", response_model=DashboardStats)
def get_stats(db: Session = Depends(get_db)):
    return get_dashboard_metrics(db=db)


@router.get("/timeline", response_model=List[TimelineEvent])
def get_timeline(
    search: Optional[str] = Query(None),
    doc_id: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    return get_all_events(db=db, search=search, doc_id=doc_id)


@router.get("/deadlines", response_model=List[DeadlineItem])
def get_deadlines(db: Session = Depends(get_db)):
    return get_all_deadlines(db=db)


@router.get("/conflicts", response_model=List[ConflictItem])
def get_conflicts(db: Session = Depends(get_db)):
    return get_all_conflicts(db=db)


@router.get("/gaps", response_model=List[MissingDocumentAlert])
def get_gaps(db: Session = Depends(get_db)):
    return get_all_gaps(db=db)


@router.post("/review-status")
def set_review_status(payload: ReviewStatusUpdate, db: Session = Depends(get_db)):
    updated = update_event_review_status(
        payload.event_id,
        payload.status,
        db=db,
    )

    return {
        "success": updated,
        "event_id": payload.event_id,
        "new_status": payload.status,
    }
