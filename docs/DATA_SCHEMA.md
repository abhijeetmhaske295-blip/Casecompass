# CaseCompass Data Schemas

## 1. Document Model
```json
{
  "id": "doc_101",
  "filename": "court_order_2024.txt",
  "upload_timestamp": "2024-05-10T14:32:00Z",
  "file_size_bytes": 14200,
  "status": "processed",
  "extracted_events_count": 5
}
```

## 2. Timeline Event Model
```json
{
  "id": "evt_001",
  "date": "2024-04-15",
  "raw_date_text": "15th day of April, 2024",
  "title": "Preliminary Injunction Issued",
  "description": "Court ordered defendants to cease contested marketing activities.",
  "document_id": "doc_101",
  "source_snippet": "IT IS HEREBY ORDERED on this 15th day of April, 2024...",
  "page_number": 2,
  "confidence_score": 0.96,
  "review_status": "verified"
}
```

## 3. Conflict Model
```json
{
  "id": "cnf_001",
  "event_title": "Summons Service Date",
  "date_a": "2024-03-01",
  "source_a": "Hearing Notice (Page 1)",
  "date_b": "2024-03-05",
  "source_b": "Affidavit of Service (Page 2)",
  "severity": "high"
}
```
