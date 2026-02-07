# Chunking Backend Test Cases
Backend test suite for the Chunking module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## CHK‑001 — Deterministic chunking (same file twice)
**Preconditions:** Same file uploaded twice
**Steps:** Upload same document twice
**Expected:** Identical chunks generated

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/file.pdf"

curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/file.pdf"

### SQL
SELECT * FROM chunks WHERE document_id IN ('{doc1_id}', '{doc2_id}') ORDER BY index;

---

## CHK‑002 — Deterministic across workspaces
**Preconditions:** Same file uploaded in W1 and W2
**Steps:** Upload same file to two references
**Expected:** Identical chunks

### curl
curl -X POST http://localhost:3001/references/{reference_w1_id}/documents \
  -F "file=@/path/to/file.pdf"

curl -X POST http://localhost:3001/references/{reference_w2_id}/documents \
  -F "file=@/path/to/file.pdf"

### SQL
SELECT * FROM chunks WHERE document_id IN ('{doc_w1_id}', '{doc_w2_id}') ORDER BY index;

---

## CHK‑003 — Chunk ordering
**Preconditions:** Document uploaded
**Steps:** GET chunks
**Expected:** Ordered 0..N

### curl
curl -X GET http://localhost:3001/documents/{document_id}/chunks

### SQL
SELECT index FROM chunks WHERE document_id = '{document_id}' ORDER BY index;

---

## CHK‑004 — Chunk size limit
**Preconditions:** Document uploaded
**Steps:** Inspect chunk sizes
**Expected:** All chunks ≤ limit

### curl
curl -X GET http://localhost:3001/documents/{document_id}/chunks

### SQL
SELECT id, LENGTH(text) AS size FROM chunks WHERE document_id = '{document_id}';

---

## CHK‑005 — Chunk boundaries
**Preconditions:** Document uploaded
**Steps:** Inspect chunk boundaries
**Expected:** No overlap

### curl
curl -X GET http://localhost:3001/documents/{document_id}/chunks

### SQL
SELECT id, index, text FROM chunks WHERE document_id = '{document_id}' ORDER BY index;

---

## CHK‑006 — Chunk long document
**Preconditions:** Large document uploaded
**Steps:** Upload large doc
**Expected:** Performance OK

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/large.pdf"

---

## CHK‑007 — Chunk short document
**Preconditions:** Short document uploaded
**Steps:** Upload short doc
**Expected:** 1 chunk

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/short.txt"

### SQL
SELECT COUNT(*) FROM chunks WHERE document_id = '{document_id}';

---

## CHK‑008 — Chunk storage
**Preconditions:** Document uploaded
**Steps:** GET chunks
**Expected:** Chunks persisted

### curl
curl -X GET http://localhost:3001/documents/{document_id}/chunks

### SQL
SELECT * FROM chunks WHERE document_id = '{document_id}';

---

## CHK‑009 — Chunk linked to document
**Preconditions:** Document uploaded
**Steps:** GET chunk
**Expected:** chunk.document_id correct

### curl
curl -X GET http://localhost:3001/chunks/{chunk_id}

### SQL
SELECT document_id FROM chunks WHERE id = '{chunk_id}';

---

## CHK‑010 — Chunk deletion on document delete
**Preconditions:** Document exists
**Steps:** DELETE document
**Expected:** All chunks deleted

### curl
curl -X DELETE http://localhost:3001/documents/{document_id}

### SQL
SELECT * FROM chunks WHERE document_id = '{document_id}';

---

## CHK‑011 — Chunk deletion on reference delete
**Preconditions:** Reference exists
**Steps:** DELETE reference
**Expected:** All chunks deleted

### curl
curl -X DELETE http://localhost:3001/references/{reference_id}

### SQL
SELECT * FROM chunks WHERE reference_id = '{reference_id}';

---

## CHK‑012 — Chunking unicode
**Preconditions:** Unicode document uploaded
**Steps:** Upload unicode doc
**Expected:** Success

### curl
curl -X POST http://localhost:3001/references/{reference_id}/documents \
  -F "file=@/path/to/unicode.txt"

---

## SQL: Inspect chunks table
SELECT * FROM chunks ORDER BY created_at DESC;
