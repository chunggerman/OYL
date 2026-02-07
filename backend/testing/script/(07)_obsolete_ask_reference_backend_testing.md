# Ask‑Reference Backend Test Cases
Backend test suite for the Ask‑Reference module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## ARF‑001 — Ask reference with valid query
**Preconditions:** Reference + embeddings exist
**Steps:** POST /ask/reference
**Expected:** 200; answer + citations returned

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "What is the company policy on leave?"
  }'

---

## ARF‑002 — Ask reference with no embeddings
**Preconditions:** Reference exists but no embeddings
**Steps:** POST /ask/reference
**Expected:** 400; “no embeddings available”

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "Explain the policy."
  }'

---

## ARF‑003 — Ask reference with empty query
**Preconditions:** Reference exists
**Steps:** POST empty query
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": ""
  }'

---

## ARF‑004 — Ask reference with long query
**Preconditions:** Reference exists
**Steps:** POST query > 10k chars
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d "{
    \"workspace_id\": \"{workspace_id}\",
    \"reference_id\": \"{reference_id}\",
    \"query\": \"$(printf 'x%.0s' {1..12000})\"
  }"

---

## ARF‑005 — Ask reference with irrelevant query
**Preconditions:** Reference exists
**Steps:** POST irrelevant query
**Expected:** 200; answer may be “no relevant information found”

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "How to cook pasta?"
  }'

---

## ARF‑006 — Cross‑workspace isolation
**Preconditions:** Reference in W1, user in W2
**Steps:** Ask reference from another workspace
**Expected:** 403 forbidden

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_other_id}",
    "reference_id": "{reference_id}",
    "query": "What is the policy?"
  }'

---

## ARF‑007 — Ask reference with multiple documents
**Preconditions:** Reference has multiple documents
**Steps:** Ask reference
**Expected:** 200; citations from multiple docs

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "Summarize all HR policies."
  }'

---

## ARF‑008 — Ask reference with unicode query
**Preconditions:** Reference exists
**Steps:** Ask with unicode
**Expected:** 200

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "公司請假政策是什麼？"
  }'

---

## ARF‑009 — Ask reference with missing reference_id
**Preconditions:** Workspace exists
**Steps:** POST missing reference_id
**Expected:** 400

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "query": "What is the policy?"
  }'

---

## ARF‑010 — Ask reference after reference deletion
**Preconditions:** Reference deleted
**Steps:** Ask reference
**Expected:** 404

### curl
curl -X POST http://localhost:3001/ask/reference \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "reference_id": "{reference_id}",
    "query": "Explain the policy."
  }'

---

## SQL: Inspect embeddings used for Ask‑Reference
SELECT * FROM embeddings WHERE reference_id = '{reference_id}' ORDER BY chunk_index;
