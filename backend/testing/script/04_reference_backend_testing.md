# Reference Backend Test Cases
Backend test suite for the Reference module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## REF‑001 — Create reference
**Expected:** 201

### curl
curl -X POST http://localhost:3001/references \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Company Handbook",
    "tags": ["policy", "hr"]
  }'

---

## REF‑002 — Duplicate reference name
**Expected:** 409

### curl
curl -X POST http://localhost:3001/references \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Company Handbook"
  }'

---

## REF‑003 — Missing name
**Expected:** 400

### curl
curl -X POST http://localhost:3001/references \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": ""
  }'

---

## REF‑004 — Upload PDF
**Expected:** 201

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/document.pdf"

---

## REF‑005 — Upload DOCX
**Expected:** 201

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/document.docx"

---

## REF‑006 — Upload TXT
**Expected:** 201

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/document.txt"

---

## REF‑007 — Unsupported file type
**Expected:** 415

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/file.exe"

---

## REF‑008 — Oversized file
**Expected:** 413

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/large_file.pdf"

---

## REF‑009 — Get reference
**Expected:** 200

### curl
curl -X GET http://localhost:3001/references/{reference_id}

---

## REF‑010 — List references
**Expected:** 200

### curl
curl -X GET "http://localhost:3001/references?workspace_id={workspace_id}"

---

## REF‑011 — Delete reference
**Expected:** 200

### curl
curl -X DELETE http://localhost:3001/references/{reference_id}

---

## REF‑012 — Delete reference with documents
**Expected:** cascading delete

### curl
curl -X DELETE http://localhost:3001/references/{reference_id}

---

## REF‑013 — Reference boundary (moved from WSP‑009)
**Expected:** 403 forbidden

### curl
curl -X GET http://localhost:3001/references/{reference_id} \
  -H "X-Workspace-ID: {workspace_other_id}"
