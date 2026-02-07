# Workflow Backend Test Cases
Backend test suite for the Workflow module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## WFL‑001 — Create workflow
**Preconditions:** Workspace exists
**Expected:** 201

### curl
curl -X POST http://localhost:3001/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Main Workflow"
  }'

---

## WFL‑002 — Duplicate workflow name
**Expected:** 409

### curl
curl -X POST http://localhost:3001/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Main Workflow"
  }'

---

## WFL‑003 — Get workflow
**Expected:** 200

### curl
curl -X GET http://localhost:3001/workflows/{workflow_id}

---

## WFL‑004 — List workflows
**Expected:** 200

### curl
curl -X GET "http://localhost:3001/workflows?workspace_id={workspace_id}"

---

## WFL‑005 — Update workflow name
**Expected:** 200

### curl
curl -X PATCH http://localhost:3001/workflows/{workflow_id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Workflow Name"}'

---

## WFL‑006 — Delete workflow
**Expected:** 200

### curl
curl -X DELETE http://localhost:3001/workflows/{workflow_id}

---

## WFL‑007 — Add workflow step
**Expected:** 201

### curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps \
  -H "Content-Type: application/json" \
  -d '{
    "assistant_id": "{assistant_id}",
    "action": "run"
  }'

---

## WFL‑008 — Workflow boundary (moved from WSP‑010)
**Expected:** 403 forbidden

### curl
curl -X POST http://localhost:3001/workflows/{workflow_other_id}/execute \
  -H "X-Workspace-ID: {workspace_other_id}"
