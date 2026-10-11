from fastapi import APIRouter, Depends
from fastapi.responses import PlainTextResponse, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from services.report_generator import generate_markdown_report, generate_csv_report

router = APIRouter()

@router.get("/report", response_class=PlainTextResponse)
def export_text_report(db: Session = Depends(get_db)):
    report_text = generate_markdown_report(db=db)
    return report_text

@router.get("/csv")
def export_csv_report(db: Session = Depends(get_db)):
    csv_content = generate_csv_report(db=db)
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=casecompass_timeline.csv"}
    )
