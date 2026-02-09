# Instructions Test Results
Generated: Mon Feb  9 16:10:23 HKT 2026

## INS-000 — Create instruction
**Expected:** 201
**Actual:** 201
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -d '{"name":"Summarize Policy","content":"Summarize the document in 3 bullet points."}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   378  100   296  100    82   147k  41730 --:--:-- --:--:-- --:--:--  369k
HTTP/1.1 201 Created
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 296
ETag: W/"128-xCHyFUrhE7iJ8M9jb6s7RbVOAlI"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"a6d256e4-25e2-4ec1-a259-d3fd52c26d7f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T08:10:23.427Z","updatedAt":"2026-02-09T08:10:23.427Z","deletedAt":null}
```

## INS-001 — Missing instruction name
**Expected:** 400
**Actual:** 400
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -d '{"name":"","content":"Valid content"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    65  100    28  100    37  46204  61056 --:--:-- --:--:-- --:--:-- 65000
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 28
ETag: W/"1c-0/IEupHJ1P5PjupLTJPNs0Hf4Zc"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Name is required"}
```

## INS-002 — Missing instruction content
**Expected:** 400
**Actual:** 400
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b/instructions -H 'Content-Type: application/json' -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -d '{"name":"Test","content":""}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    59  100    31  100    28  49600  44800 --:--:-- --:--:-- --:--:-- 59000
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 31
ETag: W/"1f-6UP47rbwLp6c8PG3pJBQOfJce5A"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Content is required"}
```

## INS-003 — AI-refine instruction
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f/refine -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   296  100   296    0     0   164k      0 --:--:-- --:--:-- --:--:--  289k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 296
ETag: W/"128-INt7kEMeKPV/PidFBdK064kNtpg"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"054f61de-c15b-44c2-ace0-b16680bf6e1f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T08:10:23.394Z","updatedAt":"2026-02-09T08:10:23.394Z","deletedAt":null}
```

## INS-004 — AI-refine invalid instruction
**Expected:** 404
**Actual:** 404
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/instructions/00000000-0000-0000-0000-000000000000/refine -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    33  100    33    0     0  35714      0 --:--:-- --:--:-- --:--:-- 33000
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-TuIr1lC0ltbqlhfbf/Uav/i225I"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Instruction not found"}
```

## INS-005 — AI-refine empty content
**Expected:** 400
**Actual:** 400
**Result:** PASS

### Request
```bash
curl -i -X PATCH http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f -H 'Content-Type: application/json' -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -d '{"content":""}'; curl -i -X POST http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f/refine -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   268  100   254  100    14   156k   8838 --:--:-- --:--:-- --:--:--  261k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 254
ETag: W/"fe-9xJ+pQRkCwXf8rLivrLU7AwB8mc"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"054f61de-c15b-44c2-ace0-b16680bf6e1f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"","refinedContent":null,"createdAt":"2026-02-09T08:10:23.394Z","updatedAt":"2026-02-09T08:10:23.479Z","deletedAt":null}  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    40  100    40    0     0  52287      0 --:--:-- --:--:-- --:--:-- 40000
HTTP/1.1 400 Bad Request
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-JOynznFbItGgzBLSSrBkss4k7ew"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Instruction content is empty"}
```

## INS-006 — Retrieve instruction
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X GET http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   254  100   254    0     0   332k      0 --:--:-- --:--:-- --:--:--  248k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 254
ETag: W/"fe-9xJ+pQRkCwXf8rLivrLU7AwB8mc"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"054f61de-c15b-44c2-ace0-b16680bf6e1f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"","refinedContent":null,"createdAt":"2026-02-09T08:10:23.394Z","updatedAt":"2026-02-09T08:10:23.479Z","deletedAt":null}
```

## INS-007 — List instructions
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/a9485bec-cfa2-4cdc-aec1-e748933a075b/instructions -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100  2012  100  2012    0     0  2119k      0 --:--:-- --:--:-- --:--:-- 1964k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 2012
ETag: W/"7dc-LUlMvtgESoeLf7auMceiD1aEc94"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"items":[{"id":"2b6258f3-1c30-4a34-b7dd-95fcdce04283","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T07:09:19.578Z","updatedAt":"2026-02-09T07:09:19.578Z","deletedAt":null},{"id":"9dbd7357-cb38-47a3-b6db-2732dd031beb","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T07:20:55.220Z","updatedAt":"2026-02-09T07:20:55.220Z","deletedAt":null},{"id":"c9e4b4ba-17c2-4a99-8799-68e688d15adb","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T07:46:00.512Z","updatedAt":"2026-02-09T07:46:00.512Z","deletedAt":null},{"id":"20ad54de-ac14-4717-9195-f7f2344b5348","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T08:03:30.961Z","updatedAt":"2026-02-09T08:03:30.961Z","deletedAt":null},{"id":"8655cd4d-317a-4ab8-8156-4f48c436085e","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Fresh Instruction","content":"Hello","refinedContent":null,"createdAt":"2026-02-09T08:03:31.056Z","updatedAt":"2026-02-09T08:03:31.056Z","deletedAt":null},{"id":"054f61de-c15b-44c2-ace0-b16680bf6e1f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"","refinedContent":null,"createdAt":"2026-02-09T08:10:23.394Z","updatedAt":"2026-02-09T08:10:23.479Z","deletedAt":null},{"id":"a6d256e4-25e2-4ec1-a259-d3fd52c26d7f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Summarize the document in 3 bullet points.","refinedContent":null,"createdAt":"2026-02-09T08:10:23.427Z","updatedAt":"2026-02-09T08:10:23.427Z","deletedAt":null}]}
```

## INS-008 — Update instruction
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X PATCH http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f -H 'Content-Type: application/json' -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -d '{"content":"Updated instruction text"}'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   316  100   278  100    38   176k  24659 --:--:-- --:--:-- --:--:--  308k
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 278
ETag: W/"116-YtJf1grKeHiReILcTS017R1ehwI"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"id":"054f61de-c15b-44c2-ace0-b16680bf6e1f","workspaceId":"a9485bec-cfa2-4cdc-aec1-e748933a075b","name":"Summarize Policy","content":"Updated instruction text","refinedContent":null,"createdAt":"2026-02-09T08:10:23.394Z","updatedAt":"2026-02-09T08:10:23.511Z","deletedAt":null}
```

## INS-009 — Delete instruction
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X DELETE http://localhost:3001/instructions/054f61de-c15b-44c2-ace0-b16680bf6e1f -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    16  100    16    0     0  12830      0 --:--:-- --:--:-- --:--:-- 16000
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true}
```

## INS-010 — Cross-workspace isolation
**Expected:** 403
**Actual:** 403
**Result:** PASS

### Request
```bash
curl -i -X GET http://localhost:3001/instructions/6c9f635d-590a-4af0-a3ff-842d95a01844 -H 'X-Workspace-ID: b046191a-72a4-4aec-a854-bf732f9b3297'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0  22175      0 --:--:-- --:--:-- --:--:-- 21000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## INS-011 — Link instruction to assistant
**Expected:** 200
**Actual:** 200
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/assistants/9b05fb75-205e-40d8-a566-f89cf74a9085/instructions/6c9f635d-590a-4af0-a3ff-842d95a01844 -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    16  100    16    0     0   5954      0 --:--:-- --:--:-- --:--:--  8000
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-oV4hJxRVSENxc/wX8+mA4/Pe4tA"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":true}
```

## INS-012 — Link invalid instruction
**Expected:** 404
**Actual:** 404
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/assistants/9b05fb75-205e-40d8-a566-f89cf74a9085/instructions/00000000-0000-0000-0000-000000000000 -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    33  100    33    0     0  38238      0 --:--:-- --:--:-- --:--:-- 33000
HTTP/1.1 404 Not Found
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-TuIr1lC0ltbqlhfbf/Uav/i225I"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Instruction not found"}
```

## INS-013 — Link instruction from another workspace
**Expected:** 403
**Actual:** 403
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/assistants/9b05fb75-205e-40d8-a566-f89cf74a9085/instructions/6c9f635d-590a-4af0-a3ff-842d95a01844 -H 'X-Workspace-ID: b046191a-72a4-4aec-a854-bf732f9b3297'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    21  100    21    0     0  25798      0 --:--:-- --:--:-- --:--:-- 21000
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 21
ETag: W/"15-TLNzmZqKxaTuFdX/dVWWPBu44/c"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"Forbidden"}
```

## INS-014 — AI-refinement engine failure
**Expected:** 500
**Actual:** 500
**Result:** PASS

### Request
```bash
curl -i -X POST http://localhost:3001/instructions/6c9f635d-590a-4af0-a3ff-842d95a01844/refine -H 'X-Workspace-ID: a9485bec-cfa2-4cdc-aec1-e748933a075b' -H 'X-Debug-Fail-AI: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100    32  100    32    0     0  35914      0 --:--:-- --:--:-- --:--:-- 32000
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 32
ETag: W/"20-+DShPoyOCzVqQ46l4TQm77LEdJE"
Date: Mon, 09 Feb 2026 08:10:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"error":"AI refinement failed"}
```

