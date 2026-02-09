# Workspace Test Results
Generated: Sun Feb  8 21:29:32 HKT 2026

## WSP-001 — Get Workspace A
**Expected:** 200
**Actual:** 403
**Result:** FAIL

### Request
```bash
curl -i http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0   2504      0 --:--:-- --:--:-- --:--:--  2625
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## WSP-002 — Get Workspace B
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i http://localhost:3001/workspaces/b046191a-72a4-4aec-a854-bf732f9b3297 -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   249  100   249    0     0   109k      0 --:--:-- --:--:-- --:--:--  121k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 249
ETag: W/"f9-l3pSMFBU5wjqYC2xuF/dfHGxlwg"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"b046191a-72a4-4aec-a854-bf732f9b3297","tenantId":"80e8a565-2af4-43c7-bdb3-285ae5f9285b","name":"Manual Workspace B","description":"test-B-updated","createdAt":"2026-02-07T07:10:44.071Z","updatedAt":"2026-02-07T07:24:33.826Z","deletedAt":null}
```

## WSP-003 — Forbidden: Wrong Tenant
**Expected:** 403
**Actual:** 403
**Result:** PASS

### Request
```bash
curl -i http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b -H 'X-Tenant-ID: 11111111-1111-1111-1111-111111111111'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0  22058      0 --:--:-- --:--:-- --:--:-- 21000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## WSP-004 — Update Workspace A
**Expected:** 200
**Actual:** 403
**Result:** FAIL

### Request
```bash
curl -i -X PATCH http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b -H 'Content-Type: application/json' -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b' -d '{"name":"Workspace A Updated"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    51  100    21  100    30  17558  25083 --:--:-- --:--:-- --:--:-- 51000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## WSP-005 — Update Workspace B
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X PATCH http://localhost:3001/workspaces/b046191a-72a4-4aec-a854-bf732f9b3297 -H 'Content-Type: application/json' -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b' -d '{"description":"test-B-updated"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   281  100   249  100    32    97k  12866 --:--:-- --:--:-- --:--:--  137k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 249
ETag: W/"f9-kKjOk0xhMnk2TYfsMxseFin3mr4"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"b046191a-72a4-4aec-a854-bf732f9b3297","tenantId":"80e8a565-2af4-43c7-bdb3-285ae5f9285b","name":"Manual Workspace B","description":"test-B-updated","createdAt":"2026-02-07T07:10:44.071Z","updatedAt":"2026-02-08T13:29:32.566Z","deletedAt":null}
```

## WSP-006 — Delete Workspace A
**Expected:** 200
**Actual:** 403
**Result:** FAIL

### Request
```bash
curl -i -X DELETE http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0  24082      0 --:--:-- --:--:-- --:--:-- 21000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## WSP-007 — Verify Workspace A is Soft Deleted
**Expected:** 403
**Actual:** 403
**Result:** PASS

### Request
```bash
curl -i http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b -H 'X-Tenant-ID: 80e8a565-2af4-43c7-bdb3-285ae5f9285b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0  24822      0 --:--:-- --:--:-- --:--:-- 21000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Sun, 08 Feb 2026 13:29:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

