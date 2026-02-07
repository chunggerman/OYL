# Workspace Backend Test Cases
Backend test suite for the Workspace module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## WSP‑001 — Create workspace
**Preconditions:** Tenant exists
**Steps:** POST /tenants/{tenant_id}/workspaces
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/tenants/{tenant_id}/workspaces \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Workspace",
    "metadata": { "purpose": "general" }
  }'

### SQL
SELECT * FROM workspaces WHERE tenant_id = '{tenant_id}' ORDER BY created_at DESC;

---

## WSP‑002 — Create workspace with duplicate name
**Preconditions:** Workspace exists
**Steps:** POST same name
**Expected:** 409 conflict

### curl
curl -X POST http://localhost:3001/tenants/{tenant_id}/workspaces \
  -H "Content-Type: application/json" \
  -d '{"name": "Main Workspace"}'

---

## WSP‑003 — Retrieve workspace
**Preconditions:** Workspace exists
**Steps:** GET /workspaces/{workspace_id}
**Expected:** 200

### curl
curl -X GET http://localhost:3001/workspaces/{workspace_id}

### SQL
SELECT * FROM workspaces WHERE id = '{workspace_id}';

---

## WSP‑004 — Retrieve workspace list
**Preconditions:** Tenant exists
**Steps:** GET /workspaces
**Expected:** 200 list returned

### curl
curl -X GET http://localhost:3001/workspaces?tenant_id={tenant_id}

### SQL
SELECT * FROM workspaces WHERE tenant_id = '{tenant_id}';

---

## WSP‑005 — Update workspace name
**Preconditions:** Workspace exists
**Steps:** PATCH /workspaces/{workspace_id}
**Expected:** 200

### curl
curl -X PATCH http://localhost:3001/workspaces/{workspace_id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Workspace Name"}'

### SQL
SELECT name FROM workspaces WHERE id = '{workspace_id}';

---

## WSP‑006 — Delete workspace
**Preconditions:** Workspace exists
**Steps:** DELETE /workspaces/{workspace_id}
**Expected:** 200

### curl
curl -X DELETE http://localhost:3001/workspaces/{workspace_id}

### SQL
SELECT id, deleted_at FROM workspaces WHERE id = '{workspace_id}';

---

## WSP‑007 — Cross‑workspace isolation
**Preconditions:** Two workspaces exist
**Steps:** Access workspace B from workspace A context
**Expected:** 403 forbidden

### curl
curl -X GET http://localhost:3001/workspaces/{workspace_b_id} \
  -H "X-Workspace-ID: {workspace_a_id}"

---

<!--
## WSP‑008 — Workspace boundary on assistants
**REMOVED — moved to Assistant test suite**
-->

<!--
## WSP‑009 — Workspace boundary on references
**REMOVED — moved to Reference test suite**
-->

<!--
## WSP‑010 — Workspace boundary on workflows
**REMOVED — moved to Workflow test suite**
-->

---

## SQL: Inspect workspace table
SELECT * FROM workspaces ORDER BY created_at DESC;
