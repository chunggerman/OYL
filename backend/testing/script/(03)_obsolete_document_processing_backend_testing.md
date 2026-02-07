# Document Processing Backend Test Cases
Backend test suite for the Document Processing module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## DOC‑001 — Extract text from PDF
**Preconditions:** PDF uploaded
**Steps:** Process document
**Expected:** Text extracted successfully

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

### SQL
SELECT id, text_extracted, metadata_extracted FROM documents WHERE id = '{document_id}';

---

## DOC‑002 — Extract text from DOCX
**Preconditions:** DOCX uploaded
**Steps:** Process document
**Expected:** Text extracted

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

### SQL
SELECT text_extracted FROM documents WHERE id = '{document_id}';

---

## DOC‑003 — Extract text from TXT
**Preconditions:** TXT uploaded
**Steps:** Process document
**Expected:** Text extracted

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑004 — Extract metadata from PDF
**Preconditions:** PDF uploaded
**Steps:** Process document
**Expected:** Metadata extracted

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

### SQL
SELECT metadata FROM documents WHERE id = '{document_id}';

---

## DOC‑005 — Extract metadata from DOCX
**Preconditions:** DOCX uploaded
**Steps:** Process document
**Expected:** Metadata extracted

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑006 — Corrupted PDF
**Preconditions:** Corrupted file uploaded
**Steps:** Process document
**Expected:** 422 unprocessable entity

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑007 — Corrupted DOCX
**Preconditions:** Corrupted DOCX uploaded
**Steps:** Process document
**Expected:** 422

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑008 — Empty file
**Preconditions:** Empty file uploaded
**Steps:** Process document
**Expected:** 422

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑009 — Invalid encoding
**Preconditions:** Invalid encoding file uploaded
**Steps:** Process document
**Expected:** 422

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## DOC‑010 — Mixed encoding
**Preconditions:** Mixed encoding file uploaded
**Steps:** Process document
**Expected:** Partial extraction or 422

### curl
curl -X POST http://localhost:3001/documents/{document_id}/process

---

## SQL: Inspect documents table
SELECT * FROM documents ORDER BY created_at DESC;
