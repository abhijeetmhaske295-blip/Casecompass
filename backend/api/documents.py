from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from schemas import DocumentResponse
from services.review_service import get_all_documents, add_document, delete_document
from services.document_parser import parse_raw_text
from services.extraction import extract_events_from_text

router = APIRouter()

@router.get("", response_model=List[DocumentResponse])
def list_documents(db: Session = Depends(get_db)):
    return get_all_documents(db=db)

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    try:
        contents = await file.read()
        text_content = contents.decode("utf-8", errors="ignore")
        
        parsed_doc = parse_raw_text(file.filename, text_content)
        events = extract_events_from_text(parsed_doc["id"], parsed_doc["filename"], parsed_doc["text"])
        
        doc_entry = add_document(parsed_doc, events, db=db)
        return doc_entry
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@router.delete("/{doc_id}")
def remove_document(doc_id: str, db: Session = Depends(get_db)):
    success = delete_document(doc_id, db=db)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}
