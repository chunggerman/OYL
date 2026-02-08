# Instructions Backend Test Cases
Backend test suite for the Instructions module.
Depends on TEN‑xxx and WSP‑xxx.

Base URL: http://localhost:3001

---

## INS‑000 — Create instruction
Preconditions: Tenant exists (TEN‑001), Workspace exists (WSP‑001)
Steps: POST valid payload
Expected: 201 created

curl -X POST http://localhost:3001/workspaces/{workspace_id}/instructions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summarize Policy",
    "content": "Summarize the document in 3 bullet points."
  }'

SQL:
SELECT * FROM instructions WHERE workspace_id = '{workspace_id}' ORDER BY created_at DESC;

---

## INS‑001 — Missing instruction name
Preconditions: Workspace exists
Steps: POST empty name
Expected: 400

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/instructions \
  -H "Content-Type: application/json" \
  -d '{"name": "", "content": "Valid content"}'

---

## INS‑002 — Missing instruction content
Preconditions: Workspace exists
Steps: POST empty content
Expected: 400

curl -i -X POST http://localhost:3001/workspaces/{workspace_id}/instructions \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "content": ""}'

---

## INS‑003 — AI‑refine instruction
Preconditions: Instruction exists (INS‑000)
Steps: POST refine
Expected: 200; refined content stored

curl -X POST http://localhost:3001/instructions/{instruction_id}/refine

SQL:
SELECT content, refined_at FROM instructions WHERE id = '{instruction_id}';

---

## INS‑004 — AI‑refine invalid instruction
Preconditions: None
Steps: refine non‑existent ID
Expected: 404

curl -i -X POST http://localhost:3001/instructions/00000000-0000-0000-0000-000000000000/refine

---

## INS‑005 — AI‑refine empty content
Preconditions: Instruction exists but content=""
Steps: refine
Expected: 400

---

## INS‑006 — Retrieve instruction
Preconditions: Instruction exists
Steps: GET /instructions/{id}
Expected: 200

curl -X GET http://localhost:3001/instructions/{instruction_id}

---

## INS‑007 — List instructions
Preconditions: Workspace exists
Steps: GET list
Expected: 200

curl -X GET http://localhost:3001/workspaces/{workspace_id}/instructions

---

## INS‑008 — Update instruction
Preconditions: Instruction exists
Steps: PATCH content
Expected: 200

curl -X PATCH http://localhost:3001/instructions/{instruction_id} \
  -H "Content-Type: application/json" \
  -d '{"content": "Updated instruction text"}'

---

## INS‑009 — Delete instruction
Preconditions: Instruction exists
Steps: DELETE
Expected: 200; soft‑deleted

SQL:
SELECT id, deleted_at FROM instructions WHERE id = '{instruction_id}';

---

## INS‑010 — Cross‑workspace isolation
Preconditions: Workspace A & B exist
Steps: GET instruction from workspace A using workspace B context
Expected: 403

curl -X GET http://localhost:3001/instructions/{instruction_id} \
  -H "X-Workspace-ID: {workspace_b_id}"

---

## INS‑011 — Link instruction to assistant
Preconditions: Assistant exists, Instruction exists
Steps: POST link
Expected: 200

curl -X POST http://localhost:3001/assistants/{assistant_id}/instructions/{instruction_id}

SQL:
SELECT * FROM assistant_instructions WHERE assistant_id = '{assistant_id}';

---

## INS‑012 — Link invalid instruction
Preconditions: Assistant exists
Steps: link non‑existent instruction
Expected: 404

---

## INS‑013 — Link instruction from another workspace
Preconditions: Assistant exists, instruction belongs to different workspace
Steps: POST link
Expected: 403

---

## INS‑014 — AI‑refinement engine failure
Preconditions: Simulate provider outage
Steps: POST refine
Expected: 500 {"errors":[{"code":"ai_refine_failed"}]}

