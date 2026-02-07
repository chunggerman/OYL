# Workspace Test Results
Generated: Sat Feb  7 14:31:39 HKT 2026

## WSP-000 — Preconditions: user + tenant exist
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X GET http://localhost:3001/users/5c26f661-1b73-4387-b4dc-cb379fe29ccd
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   173  100   173    0     0  25196      0 --:--:-- --:--:-- --:--:-- 28833
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 173
ETag: W/"ad-z3lPh0jbz5Zavwd/Wg3o6xXOLjI"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"5c26f661-1b73-4387-b4dc-cb379fe29ccd","email":"owner@example.com","name":"Tenant Owner","createdAt":"2026-02-06T04:06:18.277Z","updatedAt":"2026-02-06T04:06:18.277Z"}
```

## WSP-001 — Create workspace
**Expected:** 201
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces   -H 'Content-Type: application/json'   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'   -d '{"ownerId":"80e8a565-2af4-43c7-bdb3-285ae5f9285b","name":"Main Workspace","metadata":{"purpose":"general"}}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   140  100    33  100   107  17954  58215 --:--:-- --:--:-- --:--:--  136k
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-002 — Create workspace with duplicate name
**Expected:** 409
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces   -H 'Content-Type: application/json'   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'   -d '{"ownerId":"80e8a565-2af4-43c7-bdb3-285ae5f9285b","name":"Main Workspace"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   107  100    33  100    74   6460  14487 --:--:-- --:--:-- --:--:-- 21400
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-003 — Retrieve workspace
**Expected:** 200
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/{workspace_id}   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    33  100    33    0     0   5120      0 --:--:-- --:--:-- --:--:--  5500
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-004 — Retrieve workspace list
**Expected:** 200
**Actual:** 404
**Result:** FAIL

### Request
```bash
curl -i -X GET "http://localhost:3001/workspaces?ownerId=80e8a565-2af4-43c7-bdb3-285ae5f9285b"   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   149  100   149    0     0   106k      0 --:--:-- --:--:-- --:--:--  145k
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 149
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /workspaces</pre>
</body>
</html>
```

## WSP-005 — Update workspace name
**Expected:** 200
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X PATCH http://localhost:3001/workspaces/{workspace_id}   -H 'Content-Type: application/json'   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'   -d '{"name":"Updated Workspace Name"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    66  100    33  100    33   5092   5092 --:--:-- --:--:-- --:--:-- 11000
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-006 — Delete workspace
**Expected:** 200
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X DELETE http://localhost:3001/workspaces/{workspace_id}   -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    33  100    33    0     0   5574      0 --:--:-- --:--:-- --:--:--  6600
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-007 — Cross-workspace isolation
**Expected:** 403
**Actual:** 500
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/{workspace_b_id}   -H 'X-Tenant-ID: {workspace_a_ownerId}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    33  100    33    0     0   5240      0 --:--:-- --:--:-- --:--:--  5500
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-u8tno/8IdqEY6PFcopkQe0syfE4"
Date: Sat, 07 Feb 2026 06:31:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Internal server error"}
```

## WSP-008 — Workspace boundary on assistants
**Expected:** 403
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/assistants/{assistant_id}   -H 'X-Workspace-ID: {workspace_other_id}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (52) Empty reply from server
```

## WSP-009 — Workspace boundary on references
**Expected:** 403
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/references/{reference_id}   -H 'X-Workspace-ID: {workspace_other_id}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## WSP-010 — Workspace boundary on workflows
**Expected:** 403
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workflows/{workflow_id}/execute   -H 'X-Workspace-ID: {workspace_other_id}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

