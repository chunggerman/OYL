# Chunking Test Results
Generated: Fri Feb 20 11:23:31 HKT 2026

## CHK-000 — Chunk valid document
**Expected:** 201
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:02 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:03 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:04 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:05 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:06 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:07 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:08 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:09 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:10 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:11 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:12 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:13 --:--:--     0  0     0    0     0    0     0      0      0 --:--:--  0:00:13 --:--:--     0
curl: (52) Empty reply from server
```

## CHK-001 — Chunk empty document
**Expected:** 400
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Empty-Content: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-002 — Chunk extremely long document
**Expected:** 201
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Long-Content: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-003 — Re-chunking same document
**Expected:** 409
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-004 — Chunk non-existent document
**Expected:** 404
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/00000000-0000-0000-0000-000000000000/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-005 — Chunk document from another workspace
**Expected:** 403
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/d9c7c13c-157f-4d8b-9e64-e5f2a90f1835/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: d9c7c13c-157f-4d8b-9e64-e5f2a90f1835'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-006 — Retrieve chunks
**Expected:** 200
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunks -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-007 — Retrieve chunks for non-existent document
**Expected:** 404
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/00000000-0000-0000-0000-000000000000/chunks -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-008 — Retrieve chunks from another workspace
**Expected:** 403
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/d9c7c13c-157f-4d8b-9e64-e5f2a90f1835/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunks -H 'X-Workspace-ID: d9c7c13c-157f-4d8b-9e64-e5f2a90f1835'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-009 — Internal chunking failure
**Expected:** 500
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Fail-Chunking: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-010 — Chunk metadata correctness
**Expected:** 200
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunks -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-011 — Deterministic chunking
**Expected:** 200
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X GET http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunks -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-012 — Chunking idempotency after deletion
**Expected:** 201
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Delete-Chunks: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-013 — Chunk large binary document
**Expected:** 201
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Binary: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

## CHK-014 — Chunk mixed-language document
**Expected:** 201
**Actual:** 
**Result:** FAIL

### Request
```bash
curl -i -X POST http://localhost:3001/workspaces/260a6009-e449-4cc7-b9ee-b5b21439cc34/documents/chunking/eb8728f4-94ef-40bd-a2e4-efa1c1b50c0d/chunk -H 'X-Workspace-ID: 260a6009-e449-4cc7-b9ee-b5b21439cc34' -H 'X-Debug-Mixed-Language: true'
```

### Response
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
```

