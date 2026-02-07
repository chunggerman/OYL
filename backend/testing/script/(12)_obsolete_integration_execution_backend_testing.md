# Integration Execution Backend Test Cases
Backend test suite for the Integration Execution module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## IEX‑001 — Execute HTTP integration (GET)
**Preconditions:** HTTP integration config exists
**Steps:** POST /integration/execute
**Expected:** 200; remote API response returned

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "method": "GET",
      "path": "/items"
    }
  }'

---

## IEX‑002 — Execute HTTP integration (POST)
**Preconditions:** HTTP integration config exists
**Steps:** POST /integration/execute
**Expected:** 200; remote API response returned

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "method": "POST",
      "path": "/submit",
      "body": { "name": "John" }
    }
  }'

---

## IEX‑003 — Execute OpenAI integration (chat)
**Preconditions:** OpenAI config exists
**Steps:** POST /integration/execute
**Expected:** 200; model response returned

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "model": "gpt-4o-mini",
      "messages": [
        { "role": "user", "content": "Hello!" }
      ]
    }
  }'

---

## IEX‑004 — Missing config_id
**Preconditions:** None
**Steps:** POST missing config_id
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{ "payload": {} }'

---

## IEX‑005 — Missing payload
**Preconditions:** Config exists
**Steps:** POST missing payload
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{ "config_id": "{config_id}" }'

---

## IEX‑006 — Invalid payload schema
**Preconditions:** Config exists
**Steps:** POST invalid payload
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": { "invalid": true }
  }'

---

## IEX‑007 — Execute deleted config
**Preconditions:** Config deleted
**Steps:** POST /integration/execute
**Expected:** 404

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {}
  }'

---

## IEX‑008 — Cross‑workspace isolation
**Preconditions:** Config in W1, user in W2
**Steps:** Execute config from another workspace
**Expected:** 403 forbidden

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "X-Workspace-ID: {workspace_other_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {}
  }'

---

## IEX‑009 — HTTP integration timeout
**Preconditions:** HTTP config exists
**Steps:** Execute slow endpoint
**Expected:** 504 timeout

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "method": "GET",
      "path": "/slow-endpoint"
    }
  }'

---

## IEX‑010 — OpenAI invalid API key
**Preconditions:** OpenAI config with invalid key
**Steps:** Execute
**Expected:** 401 unauthorized

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "model": "gpt-4o-mini",
      "messages": [
        { "role": "user", "content": "Test" }
      ]
    }
  }'

---

## IEX‑011 — Execution logging
**Preconditions:** Config exists
**Steps:** Execute integration
**Expected:** Log entry created

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": { "method": "GET", "path": "/items" }
  }'

### SQL
SELECT * FROM integration_execution_logs WHERE config_id = '{config_id}' ORDER BY created_at DESC;

---

## IEX‑012 — Execution with unicode payload
**Preconditions:** Config exists
**Steps:** Execute with unicode
**Expected:** 200

### curl
curl -X POST http://localhost:3001/integration/execute \
  -H "Content-Type: application/json" \
  -d '{
    "config_id": "{config_id}",
    "payload": {
      "method": "POST",
      "path": "/submit",
      "body": { "message": "你好" }
    }
  }'

---

## SQL: Inspect integration execution logs
SELECT * FROM integration_execution_logs ORDER BY created_at DESC;
