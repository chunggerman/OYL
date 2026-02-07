Workflow Backend Test Cases
Backend test suite for the Workflow module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.
Base URL: http://localhost:3001
---
Scope of This Test Suite
This module covers:
• Workflow CRUD
• Workflow steps
• Workflow boundaries
• Assistant–workflow interactions (moved from AST‑009 → AST‑013)
This file includes WFL‑001 → WFL‑008 plus AST‑009 → AST‑013 (relocated).
---
WORKFLOW CORE TESTS
WFL‑001 — Create workflow
Preconditions: Workspace exists
Expected: 201 Created
curl
curl -X POST http://localhost:3001/workflows
-H “Content-Type: application/json”
-d ‘{
“workspace_id”: “{workspace_id}”,
“name”: “Main Workflow”
}’
---
WFL‑002 — Duplicate workflow name
Expected: 409 Conflict
curl
curl -X POST http://localhost:3001/workflows
-H “Content-Type: application/json”
-d ‘{
“workspace_id”: “{workspace_id}”,
“name”: “Main Workflow”
}’
---
WFL‑003 — Get workflow
Expected: 200 OK
curl
curl -X GET http://localhost:3001/workflows/{workflow_id}
---
WFL‑004 — List workflows
Expected: 200 OK
curl
curl -X GET “http://localhost:3001/workflows?workspace_id={workspace_id}”
---
WFL‑005 — Update workflow name
Expected: 200 OK
curl
curl -X PATCH http://localhost:3001/workflows/{workflow_id}
-H “Content-Type: application/json”
-d ‘{“name”: “Updated Workflow Name”}’
---
WFL‑006 — Delete workflow
Expected: 200 OK
curl
curl -X DELETE http://localhost:3001/workflows/{workflow_id}
---
WORKFLOW STEP TESTS
WFL‑007 — Add workflow step
Expected: 201 Created
curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps
-H “Content-Type: application/json”
-d ‘{
“assistant_id”: “{assistant_id}”,
“action”: “run”
}’
---
WFL‑008 — Workflow boundary (moved from WSP‑010)
Expected: 403 Forbidden
curl
curl -X POST http://localhost:3001/workflows/{workflow_other_id}/execute
-H “X-Workspace-ID: {workspace_other_id}”
---
ASSISTANT–WORKFLOW INTEGRATION TESTS (MOVED FROM 03)
AST‑009 — Assign assistant to workflow
Expected: 200 OK
curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps
-H “Content-Type: application/json”
-d ‘{
“assistant_id”: “{assistant_id}”,
“action”: “run”
}’
---
AST‑010 — Cross‑workspace assignment
Expected: 403 Forbidden
curl
curl -X POST http://localhost:3001/workflows/{workflow_other_id}/steps
-H “Content-Type: application/json”
-d ‘{
“assistant_id”: “{assistant_id}”
}’
---
AST‑011 — Assistant used in multiple steps
Expected: 200 OK
curl
curl -X POST http://localhost:3001/workflows/{workflow_id}/steps
-H “Content-Type: application/json”
-d ‘{
“assistant_id”: “{assistant_id}”,
“action”: “run”
}’
---
AST‑012 — Assistant removed after deletion
Expected: Steps referencing assistant become invalid
curl
curl -X DELETE http://localhost:3001/assistants/{assistant_id}
---
AST‑013 — Assistant boundary (moved from WSP‑008)
Expected: 403 Forbidden
curl
curl -X GET http://localhost:3001/assistants/{assistant_id}
-H “X-Workspace-ID: {workspace_other_id}”
---
End of Document
