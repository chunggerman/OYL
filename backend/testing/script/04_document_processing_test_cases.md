# Document Processing Backend Test Cases (DOC‑xxx)
Backend test suite for the Document Processing module (04).
Depends on TEN‑xxx and WSP‑xxx.

Base URL: http://localhost:3001

---

## DOC‑000 — Upload valid document
Preconditions: Tenant exists (TEN‑001), Workspace exists (WSP‑001)
Steps: POST multipart/form‑data with a supported file
Expected: 201 Created

curl -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}" \
  -F "file=@./samples/sample.pdf"

SQL:
SELECT * FROM document_sources WHERE workspace_id = '{workspace_id}' ORDER BY created_at DESC;
SELECT * FROM documents WHERE document_source_id = '{document_source_id}';
SELECT * FROM ingestion_jobs WHERE document_id = '{document_id}';

---

## DOC‑001 — Unsupported file type
Preconditions: Workspace exists
Steps: Upload .exe or .zip
Expected: 400 Bad Request

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}" \
  -F "file=@./samples/virus.exe"

---

## DOC‑002 — Missing file field
Preconditions: Workspace exists
Steps: POST without file field
Expected: 400 Bad Request

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}"

---

## DOC‑003 — Empty filename
Preconditions: Workspace exists
Steps: Upload file with empty filename
Expected: 400 Bad Request

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}" \
  -F "file=@\"\""

---

## DOC‑004 — File too large
Preconditions: Workspace exists
Steps: Simulate huge file using debug header
Expected: 413 Payload Too Large

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}" \
  -H "X-Debug-Fake-Size: 999999999" \
  -F "file=@./samples/sample.pdf"

---

## DOC‑005 — Ingestion job creation failure
Preconditions: Workspace exists
Steps: Trigger ingestion failure using debug header
Expected: 500 Internal Server Error

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/documents/upload \
  -H "X-Workspace-ID: {workspace_id}" \
  -H "X-Debug-Fail-Ingestion: true" \
  -F "file=@./samples/sample.pdf"

---

## DOC‑006 — Retrieve document metadata
Preconditions: Document uploaded (DOC‑000)
Steps: GET /documents/{document_id}
Expected: 200 OK

curl -X GET http://localhost:3001/documents/{document_id} \
  -H "X-Workspace-ID: {workspace_id}"

---

## DOC‑007 — List documents by workspace
Preconditions: Workspace exists, at least one document uploaded
Steps: GET list
Expected: 200 OK

curl -X GET http://localhost:3001/workspaces/{workspace_id}/documents \
  -H "X-Workspace-ID: {workspace_id}"

---

## DOC‑008 — Cross‑workspace isolation
Preconditions: Workspace A & B exist, document belongs to A
Steps: GET document using workspace B context
Expected: 403 Forbidden

curl -X GET http://localhost:3001/documents/{document_id} \
  -H "X-Workspace-ID: {workspace_b_id}"

---

## DOC‑009 — Delete document
Preconditions: Document exists
Steps: DELETE
Expected: 200 OK; soft‑deleted

curl -X DELETE http://localhost:3001/documents/{document_id} \
  -H "X-Workspace-ID: {workspace_id}"

SQL:
SELECT id, deleted_at FROM documents WHERE id = '{document_id}';

---

## DOC‑010 — Delete document from another workspace
Preconditions: Document belongs to Workspace A
Steps: DELETE using Workspace B context
Expected: 403 Forbidden

curl -X DELETE http://localhost:3001/documents/{document_id} \
  -H "X-Workspace-ID: {workspace_b_id}"

