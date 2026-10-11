from fastapi import APIRouter, Query
from typing import List, Optional
from schemas import TimelineEvent, DeadlineItem, ConflictItem, MissingDocumentAlert, ReviewStatusUpdate, DashboardStats
from services.review_service import (
    get_all_events,
    get_all_deadlines,
    get_all_conflicts,
    get_all_gaps,
    update_event_review_status,
    get_dashboard_metrics
)

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
def get_stats():
    return get_dashboard_metrics()

@router.get("/timeline", response_model=List[TimelineEvent])
def get_timeline(search: Optional[str] = Query(None), doc_id: Optional[str] = Query(None)):
    events = get_all_events()
    if doc_id:
        events = [e for e in events if e.document_id == doc_id]
    if search:
        search_lower = search.lower()
        events = [
            e for e in events 
            if search_lower in e.title.lower() or search_lower in e.description.lower() or search_lower in e.source_snippet.lower()
        ]
    return sorted(events, key=lambda x: x.date or "9999-99-99")

@router.get("/deadlines", response_model=List[DeadlineItem])
def get_deadlines():
    return get_all_deadlines()

@router.get("/conflicts", response_model=List[ConflictItem])
def get_conflicts():
    return get_all_conflicts()

@router.get("/gaps", response_model=List[MissingDocumentAlert])
def get_gaps():
    return get_all_gaps()

@router.post("/review-status")
def set_review_status(payload: ReviewStatusUpdate):
    updated = update_event_review_status(payload.event_id, payload.status)
    return {"success": updated, "event_id": payload.event_id, "new_status": payload.status}
