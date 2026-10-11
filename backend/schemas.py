from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class DocumentResponse(BaseModel):
    id: str
    filename: str
    upload_date: str
    size_bytes: int
    event_count: int
    status: str

class TimelineEvent(BaseModel):
    id: str
    date: Optional[str] = None
    raw_date_text: str
    title: str
    description: str
    document_id: str
    document_name: str
    source_snippet: str
    confidence_score: float = 0.95
    review_status: str = "pending" # pending, verified, flagged
    is_deadline: bool = False

class DeadlineItem(BaseModel):
    id: str
    title: str
    due_date: str
    document_id: str
    document_name: str
    urgency: str # urgent, upcoming, overdue
    notes: Optional[str] = None

class ConflictItem(BaseModel):
    id: str
    topic: str
    date_a: str
    source_a: str
    date_b: str
    source_b: str
    severity: str # high, medium, low
    description: str

class MissingDocumentAlert(BaseModel):
    id: str
    title: str
    referenced_in: str
    date_referenced: Optional[str] = None
    importance: str # critical, moderate, info

class ReviewStatusUpdate(BaseModel):
    event_id: str
    status: str # pending, verified, flagged

class DashboardStats(BaseModel):
    total_documents: int
    total_events: int
    active_deadlines: int
    detected_conflicts: int
    missing_records: int
