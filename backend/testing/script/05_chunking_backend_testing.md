# Chunking Backend Test Cases
Backend test suite for the Chunking module.
Depends on DOC‑xxx (document upload) and ING‑xxx (ingestion completion).
Base URL: http://localhost:3001
---
## CHK‑000 — Chunk document
Preconditions:
- Document exists (DOC‑000)
- Ingestion completed (ING‑000)
- Document has content
Steps:
POST chunk request for a valid document.
Expected:
- 201 Created
- Chunks generated deterministically
- Chunk count and size follow config
- Chunks linked to the document
curl:
curl -X POST http://localhost:3001/documents/{document_id}/chunk
-H “X-Workspace-ID: {workspace_id}”
SQL:
SELECT * FROM chunks WHERE document_id = ‘{document_id}’ ORDER BY index ASC;
---
## CHK‑001 — Chunk empty document
Preconditions:
- Document exists
- Document content = ""
Steps:
POST chunk request.
Expected:
- 400
- Error: "Document empty"
curl:
curl -i -X POST http://localhost:3001/documents/{document_id}/chunk
-H “X-Workspace-ID: {workspace_id}”
---
## CHK‑002 — Chunk extremely long document
Preconditions:
- Document exists
- Document content > max_chunk_size * 100
Steps:
POST chunk request.
Expected:
- 201
- Many chunks created
- No chunk exceeds max_chunk_size
- Deterministic chunk boundaries

SQL:
SELECT size FROM chunks WHERE document_id = ‘{document_id}’;

---

## CHK‑003 — Re‑chunking same document
Preconditions:
- Document already chunked (CHK‑000)

Steps:
POST chunk request again.

Expected:
- 409 Conflict
- Error: "Chunking already completed" or "Chunking in progress"

curl:
curl -i -X POST http://localhost:3001/documents/{document_id}/chunk
-H “X-Workspace-ID: {workspace_id}”

---

## CHK‑004 — Chunk non‑existent document
Preconditions: None

Steps:
POST chunk request for invalid UUID.

Expected:
- 404 Not Found

curl:
curl -i -X POST http://localhost:3001/documents/00000000-0000-0000-0000-000000000000/chunk
-H “X-Workspace-ID: {workspace_id}”

---

## CHK‑005 — Chunk document from another workspace
Preconditions:
- Document belongs to workspace A
- Request made using workspace B

Steps:
POST chunk request.

Expected:
- 403 Forbidden

curl:
curl -i -X POST http://localhost:3001/documents/{document_id}/chunk
-H “X-Workspace-ID: {workspace_b_id}”

---

## CHK‑006 — Retrieve chunks
Preconditions:
- Document chunked (CHK‑000)

Steps:
GET chunks for document.

Expected:
- 200
- List of chunks in correct order
- Each chunk has: id, document_id, index, content, size

curl:
curl -X GET http://localhost:3001/documents/{document_id}/chunks
-H “X-Workspace-ID: {workspace_id}”

SQL:
SELECT * FROM chunks WHERE document_id = ‘{document_id}’ ORDER BY index ASC;

---

## CHK‑007 — Retrieve chunks for non‑existent document
Preconditions: None

Steps:
GET chunks for invalid UUID.

Expected:
- 404

curl:
curl -i -X GET http://localhost:3001/documents/00000000-0000-0000-0000-000000000000/chunks
-H “X-Workspace-ID: {workspace_id}”

---

## CHK‑008 — Retrieve chunks from another workspace
Preconditions:
- Document belongs to workspace A
- Request made using workspace B

Steps:
GET chunks.

Expected:
- 403 Forbidden

curl:
curl -i -X GET http://localhost:3001/documents/{document_id}/chunks
-H “X-Workspace-ID: {workspace_b_id}”

---

## CHK‑009 — Internal chunking failure
Preconditions:
- Document exists
- Simulate failure using debug header

Steps:
POST chunk request with failure flag.

Expected:
- 500
- Error: "Chunking failed"

curl:
curl -i -X POST http://localhost:3001/documents/{document_id}/chunk
-H “X-Workspace-ID: {workspace_id}”
-H “X-Debug-Fail-Chunking: true”

---

## CHK‑010 — Chunk metadata correctness
Preconditions:
- Document chunked

Steps:
Verify chunk metadata.

Expected:
- index starts at 0
- size matches content length
- no null fields

SQL:
SELECT id, index, size, LENGTH(content) FROM chunks WHERE document_id = ‘{document_id}’;

---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:

---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:


---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:

---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:

---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:
SELECT id, index, size, LENGTH(content) FROM chunks WHERE document_id = ‘{document_id}’;

---

## CHK‑011 — Deterministic chunking
Preconditions:
- Same document chunked twice in two different environments

Steps:
Compare chunk boundaries.

Expected:
- Identical chunk count
- Identical chunk sizes
- Identical chunk content

SQL:
SELECT md5(content) FROM chunks WHERE document_id = ‘{document_id}’ ORDER BY index;

---

## CHK‑012 — Chunking idempotency
Preconditions:
- Document chunked
- Chunks deleted manually

Steps:
Chunk again.

Expected:
- 201
- New chunks created
- No duplicates

---

## CHK‑013 — Chunking large binary document
Preconditions:
- Document is PDF or image
- Extracted text is large

Steps:
POST chunk request.

Expected:
- 201
- Chunks created from extracted text
- No binary content in chunks

---

## CHK‑014 — Chunking document with mixed languages
Preconditions:
- Document contains English + Chinese + symbols

Steps:
POST chunk request.

Expected:
- 201
- Chunk boundaries respect UTF‑8
- No broken characters
