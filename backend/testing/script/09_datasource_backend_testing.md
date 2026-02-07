# Data Source Backend Test Cases
Backend test suite for the Data Source module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---

## DS‑001 — Create data source (HTTP)
**Preconditions:** Workspace exists
**Steps:** POST /datasources
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "http",
    "name": "Public API",
    "config": {
      "url": "https://api.example.com/data",
      "method": "GET"
    }
  }'

### SQL
SELECT * FROM datasources WHERE workspace_id = '{workspace_id}' ORDER BY created_at DESC;

---

## DS‑002 — Create data source (SQL)
**Preconditions:** Workspace exists
**Steps:** POST /datasources
**Expected:** 201 created

### curl
curl -X POST http://localhost:3001/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "sql",
    "name": "Internal DB",
    "config": {
      "host": "db.internal",
      "port": 5432,
      "database": "main",
      "username": "user",
      "password": "pass"
    }
  }'

---

## DS‑003 — Missing type
**Preconditions:** Workspace exists
**Steps:** POST missing type
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "name": "Invalid Source"
  }'

---

## DS‑004 — Invalid config
**Preconditions:** Workspace exists
**Steps:** POST invalid config
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/datasources \
  -H "Content-Type: application/json" \
  -d '{
    "workspace_id": "{workspace_id}",
    "type": "http",
    "name": "Bad Source",
    "config": { "invalid": true }
  }'

---

## DS‑005 — Get data source
**Preconditions:** Data source exists
**Steps:** GET /datasources/{datasource_id}
**Expected:** 200

### curl
curl -X GET http://localhost:3001/datasources/{datasource_id}

### SQL
SELECT * FROM datasources WHERE id = '{datasource_id}';

---

## DS‑006 — List data sources
**Preconditions:** Workspace exists
**Steps:** GET /datasources?workspace_id=...
**Expected:** 200 list returned

### curl
curl -X GET "http://localhost:3001/datasources?workspace_id={workspace_id}"

### SQL
SELECT * FROM datasources WHERE workspace_id = '{workspace_id}';

---

## DS‑007 — Update data source
**Preconditions:** Data source exists
**Steps:** PATCH /datasources/{datasource_id}
**Expected:** 200; updated

### curl
curl -X PATCH http://localhost:3001/datasources/{datasource_id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Source Name"
  }'

### SQL
SELECT name FROM datasources WHERE id = '{datasource_id}';

---

## DS‑008 — Delete data source
**Preconditions:** Data source exists
**Steps:** DELETE /datasources/{datasource_id}
**Expected:** 200; soft‑deleted

### curl
curl -X DELETE http://localhost:3001/datasources/{datasource_id}

### SQL
SELECT id, deleted_at FROM datasources WHERE id = '{datasource_id}';

---

## DS‑009 — Cross‑workspace isolation
**Preconditions:** Data source in W1, user in W2
**Steps:** GET data source from another workspace
**Expected:** 403 forbidden

### curl
curl -X GET http://localhost:3001/datasources/{datasource_id} \
  -H "X-Workspace-ID: {workspace_other_id}"

---

## DS‑010 — Test connection (HTTP)
**Preconditions:** HTTP data source exists
**Steps:** POST /datasources/{id}/test
**Expected:** 200; connection OK

### curl
curl -X POST http://localhost:3001/datasources/{datasource_id}/test

---

## DS‑011 — Test connection (SQL)
**Preconditions:** SQL data source exists
**Steps:** POST /datasources/{id}/test
**Expected:** 200 or 400 depending on credentials

### curl
curl -X POST http://localhost:3001/datasources/{datasource_id}/test

---

## SQL: Inspect data sources table
SELECT * FROM datasources ORDER BY created_at DESC;
