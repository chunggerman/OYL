# Integration Config Backend Test Cases
Backend test suite for the Integration Config module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## ICF‑001 — Create integration config (HTTP)
**Preconditions:** Workspace exists
**Steps:** POST /integration/config
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/integration/config \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "http",
    "name": "Webhook Sender",
    "config": {
      "url": "https://example.com/webhook",
      "method": "POST",
      "headers": { "Authorization": "Bearer token" }
    }
  }'

### SQL
SELECT * FROM integration_configs WHERE workspace_id = '{workspace_id}' ORDER BY created_at DESC;

---

## ICF‑002 — Create integration config (OpenAI)
**Preconditions:** Workspace exists
**Steps:** POST /integration/config
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/integration/config \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "openai",
    "name": "OpenAI Model",
    "config": {
      "api_key": "sk-xxxx",
      "model": "gpt-4o-mini"
    }
  }'

---

## ICF‑003 — Missing type
**Preconditions:** Workspace exists
**Steps:** POST missing type
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/integration/config \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Invalid Config"
  }'

---

## ICF‑004 — Invalid config schema
**Preconditions:** Workspace exists
**Steps:** POST invalid config
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/integration/config \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "http",
    "name": "Bad Config",
    "config": { "invalid": true }
  }'

---

## ICF‑005 — Get integration config
**Preconditions:** Integration config exists
**Steps:** GET /integration/config/{config_id}
**Expected:** 200

### curl
curl -X GET http://localhost:3001/integration/config/{config_id}

### SQL
SELECT * FROM integration_configs WHERE id = '{config_id}';

---

## ICF‑006 — List integration configs
**Preconditions:** Workspace exists
**Steps:** GET /integration/config?workspace_id=...
**Expected:** 200 list returned

### curl
curl -X GET "http://localhost:3001/integration/config?workspace_id={workspace_id}"

### SQL
SELECT * FROM integration_configs WHERE workspace_id = '{workspace_id}';

---

## ICF‑007 — Update integration config
**Preconditions:** Integration config exists
**Steps:** PATCH /integration/config/{config_id}
**Expected:** 200; updated

### curl
curl -X PATCH http://localhost:3001/integration/config/{config_id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Integration Name"
  }'

### SQL
SELECT name FROM integration_configs WHERE id = '{config_id}';

---

## ICF‑008 — Delete integration config
**Preconditions:** Integration config exists
**Steps:** DELETE /integration/config/{config_id}
**Expected:** 200; soft‑deleted

### curl
curl -X DELETE http://localhost:3001/integration/config/{config_id}

### SQL
SELECT id, deleted_at FROM integration_configs WHERE id = '{config_id}';

---

## ICF‑009 — Cross‑workspace isolation
**Preconditions:** Config in W1, user in W2
**Steps:** GET config from another workspace
**Expected:** 403 forbidden

### curl
curl -X GET http://localhost:3001/integration/config/{config_id} \
  -H "X-Workspace-ID: {workspace_other_id}"

---

## ICF‑010 — Validate config (HTTP)
**Preconditions:** HTTP config exists
**Steps:** POST /integration/config/{id}/validate
**Expected:** 200; validation OK

### curl
curl -X POST http://localhost:3001/integration/config/{config_id}/validate

---

## ICF‑011 — Validate config (OpenAI)
**Preconditions:** OpenAI config exists
**Steps:** POST /integration/config/{id}/validate
**Expected:** 200 or 400 depending on API key

### curl
curl -X POST http://localhost:3001/integration/config/{config_id}/validate

---

## SQL: Inspect integration configs table
SELECT * FROM integration_configs ORDER BY created_at DESC;
