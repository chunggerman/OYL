Assistant Backend Test Cases
Backend test suite for the Assistant module.
Includes: Preconditions, Steps, Expected Results, curl commands, and SQL verification.
Base URL: http://localhost:3001
---
Scope of This Test Suite
This module covers assistant CRUD and settings operations only.
Workflow‑related assistant tests (assignment, multi‑step usage, cross‑workspace workflow boundaries)
have been moved to 13_workflow_backend_testing.md.
This file includes AST‑001 → AST‑008 only.
---
AST‑001 — Create assistant
Preconditions: Workspace exists
Steps: POST /assistants
Expected: 201 Created
curl
curl -X POST http://localhost:3001/assistants
-H “Content-Type: application/json”
-d ‘{
“workspace_id”: “{workspace_id}”,
“name”: “General Assistant”,
“instruction”: “You are a helpful assistant.”,
“settings”: { “temperature”: 0.7 }
}’
SQL
SELECT * FROM assistants
WHERE workspace_id = ‘{workspace_id}’
ORDER BY created_at DESC;
---
AST‑002 — Missing instruction
Expected: 400 Bad Request
curl
curl -X POST http://localhost:3001/assistants
-H “Content-Type: application/json”
-d ‘{
“workspace_id”: “{workspace_id}”,
“name”: “Bad Assistant”,
“instruction”: “”
}’
---
AST‑003 — Instruction too long
Expected: 400 Bad Request
curl
curl -X POST http://localhost:3001/assistants
-H “Content-Type: application/json”
-d “{
"workspace_id": "{workspace_id}",
"name": "Overflow Assistant",
"instruction": "$(printf ‘x%.0s’ {1..12000})"
}”
---
AST‑004 — Get assistant
Expected: 200 OK
curl
curl -X GET http://localhost:3001/assistants/{assistant_id}
---
AST‑005 — List assistants
Expected: 200 OK
curl
curl -X GET “http://localhost:3001/assistants?workspace_id={workspace_id}”
---
AST‑006 — Update instruction
Expected: 200 OK
curl
curl -X PATCH http://localhost:3001/assistants/{assistant_id}
-H “Content-Type: application/json”
-d ‘{“instruction”: “Updated instruction text.”}’
---
AST‑007 — Update settings
Expected: 200 OK
curl
curl -X PATCH http://localhost:3001/assistants/{assistant_id}
-H “Content-Type: application/json”
-d ‘{
“settings”: { “temperature”: 0.3, “top_p”: 0.9 }
}’
---
AST‑008 — Delete assistant
Expected: 200 OK
curl
curl -X DELETE http://localhost:3001/assistants/{assistant_id}
---
End of Document
