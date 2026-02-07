# Tenant Backend Test Cases
Backend test suite for the Tenant module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.

Base URL: `http://localhost:3001`

---
## TEN‑000 — Create user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "name": "Tenant Owner",
    "password": "Password123!"
  }'

SELECT * FROM users ORDER BY created_at DESC LIMIT 5;


## TEN‑001 — Create tenant
**Preconditions:** None
**Steps:** POST /tenants with valid payload
**Expected:** 201 created; metadata encrypted

### curl
curl -X POST http://localhost:3001/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "metadata": { "plan": "pro", "region": "us-east" }
  }'

### SQL
SELECT * FROM tenants ORDER BY created_at DESC LIMIT 5;
 id                  |    name     |          metadata_encrypted          |          created_at           |          updated_at           | deleted_at |               owner_id
--------------------------------------+-------------+--------------------------------------+-------------------------------+-------------------------------+------------+--------------------------------------
 906d41dd-b0b3-4f81-ae0f-01612b424f2a |             |                                      | 2026-02-06 12:27:43.481755+08 | 2026-02-06 12:27:43.481755+08 |            |
 e1266227-4764-4d12-9172-8cc44e400e12 | Acme Corp   | {"plan": "pro", "region": "us-east"} | 2026-02-06 12:23:41.584546+08 | 2026-02-06 12:23:41.584546+08 |            | 5c26f661-1b73-4387-b4dc-cb379fe29ccd
 80e8a565-2af4-43c7-bdb3-285ae5f9285b | Demo Tenant |                                      | 2026-02-01 22:53:24.556172+08 | 2026-02-01 22:53:24.556172+08 |            |
(3 rows)
---

## TEN‑002 — Missing tenant name
**Preconditions:** None
**Steps:** POST empty name
**Expected:** 400 error

### curl
curl -X POST http://localhost:3001/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "ownerId": "5c26f661-1b73-4387-b4dc-cb379fe29ccd"
  }'
### result
curl -i -X POST http://localhost:3001/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "ownerId": "5c26f661-1b73-4387-b4dc-cb379fe29ccd"
  }'

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 78
ETag: W/"4e-zYUZCl7i56zUXr+y0A76LCkAfwY"
Date: Fri, 06 Feb 2026 07:30:48 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"errors":[{"code":"too_small","message":"Name is required","path":["name"]}]}%

---

## TEN‑003 — Oversized metadata
**Preconditions:** None
**Steps:** POST metadata >10KB
**Expected:** 400 error

### curl
curl -i -X POST http://localhost:3001/tenants \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"BigMeta\",
    \"metadata\": { \"blob\": \"$(printf 'x%.0s' {1..12000})\" }
  }"
### result
curl -i -X POST http://localhost:3001/tenants \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"BigMeta\",
    \"metadata\": { \"blob\": \"$(printf 'x%.0s' {1..12000})\" }
  }"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 118
ETag: W/"76-MIfoJBFT8h3liGhlH68IoVOw7kE"
Date: Fri, 06 Feb 2026 07:31:28 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"errors":[{"code":"invalid_type","message":"Invalid input: expected string, received undefined","path":["ownerId"]}]}%
---

## TEN‑004 — Get tenant
**Preconditions:** Tenant exists
**Steps:** GET /tenants/{tenant_id}
**Expected:** 200; encrypted fields hidden

### curl
curl -X GET http://localhost:3001/tenants/{tenant_id}
### result
curl -X GET http://localhost:3001/tenants/e1266227-4764-4d12-9172-8cc44e400e12
{"id":"e1266227-4764-4d12-9172-8cc44e400e12","name":"Acme Corp","metadata_encrypted":{"plan":"pro","region":"us-east"},"created_at":"2026-02-06T04:23:41.584Z","updated_at":"2026-02-06T04:23:41.584Z","deleted_at":null,"owner_id":"5c26f661-1b73-4387-b4dc-cb379fe29ccd"}%

### SQL
SELECT * FROM tenants WHERE id = '{tenant_id}';
### result
refer to TEN-001
---

## TEN‑005 — Get non‑existent tenant
**Preconditions:** None
**Steps:** GET invalid ID
**Expected:** 404

### curl
curl -X GET http://localhost:3001/tenants/00000000-0000-0000-0000-000000000000

---

## TEN‑006 — Update tenant name
**Preconditions:** Tenant exists
**Steps:** PATCH /tenants/{tenant_id}
**Expected:** 200; name updated

### curl
curl -X PATCH http://localhost:3001/tenants/{tenant_id} \
  -H "Content-Type: application/json" \
  -d '{"name": "New Tenant Name"}'

### SQL
SELECT name FROM tenants WHERE id = '{tenant_id}';

---

## TEN‑007 — Update tenant metadata
**Preconditions:** Tenant exists
**Steps:** PATCH metadata
**Expected:** 200; metadata encrypted

### curl
curl -X PATCH http://localhost:3001/tenants/{tenant_id} \
  -H "Content-Type: application/json" \
  -d '{"metadata": {"plan": "enterprise"}}'

### SQL
SELECT metadata FROM tenants WHERE id = '{tenant_id}';

---

## TEN‑008 — Delete tenant
**Preconditions:** Tenant exists
**Steps:** DELETE /tenants/{tenant_id}
**Expected:** 200; soft‑deleted

### curl
curl -X DELETE http://localhost:3001/tenants/{tenant_id}

### SQL
SELECT id, deleted_at FROM tenants WHERE id = '{tenant_id}';

---

## TEN‑009 — Cross‑tenant isolation
**Preconditions:** Two tenants exist
**Steps:** Access Tenant B using Tenant A context
**Expected:** 403

### curl
curl -X GET http://localhost:3001/tenants/{tenant_b_id} \
  -H "X-Tenant-ID: {tenant_a_id}"

---

## TEN‑010 — Tenant boundary on nested objects
**Preconditions:** Tenants A & B exist
**Steps:** Access workspace of B using A
**Expected:** 403

### curl
curl -X GET http://localhost:3001/workspaces/{workspace_b_id} \
  -H "X-Tenant-ID: {tenant_a_id}"

---

## SQL: Inspect tenant table
SELECT * FROM tenants ORDER BY created_at DESC;
