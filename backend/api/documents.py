import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from schemas import DocumentResponse
from services.review_service import get_all_documents, add_document, delete_document
from services.document_parser import parse_raw_text
from services.extraction import extract_events_from_text

router = APIRouter()
UPLOAD_DIR = "uploads"

@router.get("", response_model=List[DocumentResponse])
def list_documents():
    return get_all_documents()

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    try:
        # 1. Save the file locally
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        contents = await file.read()
        
        with open(file_path, "wb") as f:
            f.write(contents)
            
        # 2. Parse the text
        text_content = contents.decode("utf-8", errors="ignore")
        parsed_doc = parse_raw_text(file.filename, text_content)
        
        # 3. Extract events and add to in-memory store
        events = extract_events_from_text(parsed_doc["id"], parsed_doc["filename"], parsed_doc["text"])
        doc_entry = add_document(parsed_doc, events)
        
        return doc_entry
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@router.delete("/{doc_id}")
def remove_document(doc_id: str):
    success = delete_document(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}