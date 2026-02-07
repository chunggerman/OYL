# Embedding Backend Test Cases
Backend test suite for the Embedding module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## EMB‑001 — Generate embedding for a chunk
**Preconditions:** Chunk exists
**Steps:** POST /embeddings
**Expected:** Embedding stored

### curl
curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{
    "chunk_id": "{chunk_id}"
  }'

### SQL
SELECT * FROM embeddings WHERE chunk_id = '{chunk_id}';

---

## EMB‑002 — Generate embeddings for all chunks in a document
**Preconditions:** Document uploaded and chunked
**Steps:** POST /documents/{document_id}/embeddings
**Expected:** All chunks embedded

### curl
curl -X POST http://localhost:3001/documents/{document_id}/embeddings

### SQL
SELECT * FROM embeddings WHERE document_id = '{document_id}' ORDER BY chunk_index;

---

## EMB‑003 — Deterministic embeddings (same chunk)
**Preconditions:** Same chunk embedded twice
**Steps:** Generate twice
**Expected:** Identical vectors

### curl
curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{chunk_id}"}'

curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{chunk_id}"}'

### SQL
SELECT embedding FROM embeddings WHERE chunk_id = '{chunk_id}' ORDER BY created_at;

---

## EMB‑004 — Deterministic across workspaces
**Preconditions:** Same chunk text in W1 and W2
**Steps:** Generate embeddings
**Expected:** Identical vectors

### curl
curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{chunk_w1_id}"}'

curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{chunk_w2_id}"}'

### SQL
SELECT embedding FROM embeddings WHERE chunk_id IN ('{chunk_w1_id}', '{chunk_w2_id}') ORDER BY chunk_id;

---

## EMB‑005 — Embedding linked to chunk
**Preconditions:** Chunk exists
**Steps:** GET embedding
**Expected:** embedding.chunk_id correct

### curl
curl -X GET http://localhost:3001/embeddings/{embedding_id}

### SQL
SELECT chunk_id FROM embeddings WHERE id = '{embedding_id}';

---

## EMB‑006 — Delete embedding on chunk delete
**Preconditions:** Chunk exists
**Steps:** DELETE chunk
**Expected:** Embeddings removed

### curl
curl -X DELETE http://localhost:3001/chunks/{chunk_id}

### SQL
SELECT * FROM embeddings WHERE chunk_id = '{chunk_id}';

---

## EMB‑007 — Delete embedding on reference delete
**Preconditions:** Reference exists
**Steps:** DELETE reference
**Expected:** All embeddings removed

### curl
curl -X DELETE http://localhost:3001/references/{reference_id}

### SQL
SELECT * FROM embeddings WHERE reference_id = '{reference_id}';

---

## EMB‑008 — Unicode text embedding
**Preconditions:** Chunk contains unicode text
**Steps:** Generate embedding
**Expected:** Success

### curl
curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{chunk_id}"}'

---

## EMB‑009 — Empty chunk
**Preconditions:** Chunk text empty
**Steps:** Generate embedding
**Expected:** 422 error

### curl
curl -X POST http://localhost:3001/embeddings \
  -H "Content-Type: application/json" \
  -d '{"chunk_id": "{empty_chunk_id}"}'

---

## EMB‑010 — Performance test
**Preconditions:** Large document
**Steps:** Generate embeddings
**Expected:** Within performance threshold

### curl
curl -X POST http://localhost:3001/documents/{document_id}/embeddings

---

## EMB‑011 — Drift test (same doc twice)
**Preconditions:** Same document uploaded twice
**Steps:** Generate embeddings
**Expected:** Identical vectors

### curl
curl -X POST http://localhost:3001/documents/{doc1_id}/embeddings
curl -X POST http://localhost:3001/documents/{doc2_id}/embeddings

### SQL
SELECT embedding FROM embeddings WHERE document_id IN ('{doc1_id}', '{doc2_id}') ORDER BY document_id, chunk_index;

---

## EMB‑012 — Storage integrity
**Preconditions:** Chunk exists
**Steps:** Inspect embedding
**Expected:** Vector stored correctly

### curl
curl -X GET http://localhost:3001/embeddings/{embedding_id}

### SQL
SELECT id, chunk_id, embedding FROM embeddings WHERE id = '{embedding_id}';

---

## SQL: Inspect embeddings table
SELECT * FROM embeddings ORDER BY created_at DESC;
