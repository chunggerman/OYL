# Ask‑Data Backend Test Cases
Backend test suite for the Ask‑Data module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## AD‑001 — Query HTTP data source
**Preconditions:** HTTP data source exists
**Steps:** POST /ask/data
**Expected:** 200; response from remote API returned

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "GET /items"
  }'

---

## AD‑002 — Query SQL data source
**Preconditions:** SQL data source exists
**Steps:** POST /ask/data
**Expected:** 200; SQL rows returned

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELECT * FROM users LIMIT 5;"
  }'

---

## AD‑003 — Missing query
**Preconditions:** Data source exists
**Steps:** POST empty query
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": ""
  }'

---

## AD‑004 — Query too long
**Preconditions:** Data source exists
**Steps:** POST query >10k chars
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d "{
    \"workspace_id\": \"{workspace_id}\",
    \"datasource_id\": \"{datasource_id}\",
    \"query\": \"$(printf 'x%.0s' {1..12000})\"
  }"

---

## AD‑005 — Invalid SQL query
**Preconditions:** SQL data source exists
**Steps:** POST invalid SQL
**Expected:** 400 or 422

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELEC WRONG SYNTAX"
  }'

---

## AD‑006 — Invalid HTTP query
**Preconditions:** HTTP data source exists
**Steps:** POST invalid HTTP method
**Expected:** 400

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "INVALID /endpoint"
  }'

---

## AD‑007 — Cross‑workspace isolation
**Preconditions:** Data source in W1, user in W2
**Steps:** Query data source from another workspace
**Expected:** 403 forbidden

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_other_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELECT 1;"
  }'

---

## AD‑008 — Query deleted data source
**Preconditions:** Data source deleted
**Steps:** POST /ask/data
**Expected:** 404

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELECT 1;"
  }'

---

## AD‑009 — Query with unicode
**Preconditions:** Data source exists
**Steps:** POST unicode query
**Expected:** 200

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELECT * FROM employees WHERE name = \"王小明\";"
  }'

---

## AD‑010 — Performance test (large SQL result)
**Preconditions:** SQL data source with large table
**Steps:** Query large dataset
**Expected:** 200; response within performance threshold

### curl
curl -X POST http://localhost:3001/ask/data \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "datasource_id": "{datasource_id}",
    "query": "SELECT * FROM logs LIMIT 50000;"
  }'

---

## SQL: Inspect data source usage logs
SELECT * FROM datasource_queries ORDER BY created_at DESC;
