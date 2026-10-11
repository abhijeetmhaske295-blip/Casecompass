# CaseCompass API Documentation

Base URL: `/api`

## Endpoints

### 1. Documents
- `GET /api/documents`
  - Returns the list of ingested legal documents with metadata.
- `POST /api/documents/upload`
  - Multipart form upload of `.txt`, `.pdf`, `.docx` files.
- `GET /api/documents/{doc_id}`
  - Retrieves document text content, parsed tokens, and audit status.
- `DELETE /api/documents/{doc_id}`
  - Deletes a document from the session cache.

### 2. Analysis & Timeline
- `GET /api/analysis/timeline`
  - Retrieves extracted chronological events across all uploaded documents.
  - Query params: `search`, `start_date`, `end_date`, `doc_id`.
- `GET /api/analysis/deadlines`
  - Returns detected statutory, court-ordered, or filing deadlines sorted by urgency.
- `GET /api/analysis/conflicts`
  - Highlights date, witness, or factual contradictions discovered across files.
- `GET /api/analysis/gaps`
  - Detects cited filings, attachments, or court orders that are missing from the bundle.
- `POST /api/analysis/review-status`
  - Updates review verification tag for an extracted event (`verified`, `flagged`, `pending`).

### 3. Export
- `GET /api/export/report`
  - Generates comprehensive markdown/JSON audit summary for trial preparation.
- `GET /api/export/csv`
  - Exports timeline events in standard CSV format for Excel/litigation software.
