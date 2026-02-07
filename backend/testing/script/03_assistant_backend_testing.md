# Assistant Backend Test Cases
Backend test suite for the Assistant module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## AST‑001 — Create assistant
**Preconditions:** Workspace exists
**Steps:** POST /assistants
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/assistants \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "General Assistant",
    "instruction": "You are a helpful assistant.",
    "settings": { "temperature": 0.7 }
  }'

### SQL
SELECT * FROM assistants WHERE workspace_id = '{workspace_id}' ORDER BY created_at DESC;

---

## AST‑002 — Missing instruction
**Expected:** 400

### curl
curl -X POST http://localhost:3001/assistants \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Bad Assistant",
    "instruction": ""
  }'

---

## AST‑003 — Instruction too long
**Expected:** 400

### curl
curl -X POST http://localhost:3001/assistants \
  -H "Content-Type: application/json" \
  -d "{
    \"workspace_id\": \"{workspace_id}\",
    \"name\": \"Overflow Assistant\",
    \"instruction\": \"$(printf 'x%.0s' {1..12000})\"
  }"

---

## AST‑004 — Get assistant
**Expected:** 200

### curl
curl -X GET http://localhost:3001/assistants/{assistant_id}

---

## AST‑005 — List assistants
**Expected:** 200

### curl
curl -X GET "http://localhost:3001/assistants?workspace_id={workspace_id}"

---

## AST‑006 — Update instruction
**Expected:** 200

### curl
curl -X PATCH http://localhost:3001/assistants/{assistant_id} \
  -H "Content-Type: application/json" \
  -d '{"instruction": "Updated instruction text."}'

---

## AST‑007 — Update settings
**Expected:** 200

### curl
curl -X PATCH http://localhost:3001/assistants/{assistant_id} \
  -H "Content-Type: application/json" \
  -d '{
    "settings": { "temperature": 0.3, "top_p": 0.9 }
  }'

---

## AST‑008 — Delete assistant
**Expected:** 200

### curl
curl -X DELETE http://localhost:3001/assistants/{assistant_id}

---

## AST‑009 — Assign assistant to workflow
**Expected:** 200

### curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "{assistant_id}",
    "action": "run"
  }'

---

## AST‑010 — Cross‑workspace assignment
**Expected:** 403 forbidden

### curl
curl -X POST http://localhost:3001/workflows/{workflow_other_id}/steps \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "{assistant_id}"
  }'

---

## AST‑011 — Assistant used in multiple steps
**Expected:** 200

### curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "{assistant_id}",
    "action": "run"
  }'

---

## AST‑012 — Assistant removed after deletion
**Expected:** Steps referencing assistant become invalid

### curl
curl -X DELETE http://localhost:3001/assistants/{assistant_id}

---

## AST‑013 — Assistant boundary (moved from WSP‑008)
**Expected:** 403 forbidden

### curl
curl -X GET http://localhost:3001/assistants/{assistant_id} \
  -H "X-Workspace-ID: {workspace_other_id}"
