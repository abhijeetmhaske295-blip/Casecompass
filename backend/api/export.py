from fastapi import APIRouter
from fastapi.responses import PlainTextResponse, Response
from services.report_generator import generate_markdown_report, generate_csv_report

router = APIRouter()

@router.get("/report", response_class=PlainTextResponse)
def export_text_report():
    report_text = generate_markdown_report()
    return report_text

@router.get("/csv")
def export_csv_report():
    csv_content = generate_csv_report()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=casecompass_timeline.csv"}
    )
