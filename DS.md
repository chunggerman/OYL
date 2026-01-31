# Design Specification (DS)
# OYL — Multi-Tenant, Workspace-Centric Enterprise AI Platform

This Design Specification defines the architectural design, data models, API design, and system interactions for OYL.
It translates functional behavior (FS) into technical design patterns without specifying implementation details.

---

## 1. Architectural overview

OYL follows a multi-tenant, workspace-centric, assistant-as-configuration architecture.

### 1.1 High-level architecture

Client (Next.js/React) → Backend API (REST) → Core Services → Storage Layer

Core services:
- Tenant Service
- Workspace Service
- Assistant Service
- Reference & Document Service
- Chunk & Embedding Service
- Tag Service
- Data Source Service
- Integration Service
- Workflow Service

Storage:
- Postgres (metadata)
- Blob storage (documents)
- Vector DB (embeddings)
- Encrypted secrets store

### 1.2 Design principles

- Deterministic processing (chunking, embeddings, retrieval)
- Strict isolation (tenant → workspace → object)
- Assistants as configuration, capabilities as engines
- Teammate is a role, not a core entity
- Auditability and observability
- Security by default (TLS, TDE, AES-256)

---

## 2. Data model design

### 2.1 Tenant

- `id: UUID`
- `name: string`
- `metadata: jsonb` (encrypted)
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.2 Workspace

- `id: UUID`
- `tenant_id: UUID` (FK)
- `name: string`
- `description: string`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.3 Assistant

- `id: UUID`
- `workspace_id: UUID` (FK)
- `name: string`
- `description: string`
- `instruction: text`
- `ai_instruction: text`
- `settings: jsonb`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.4 Reference

- `id: UUID`
- `workspace_id: UUID` (FK)
- `name: string`
- `description: string`
- `tags: text[]`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.5 Document

- `id: UUID`
- `reference_id: UUID` (FK)
- `filename: string`
- `mime_type: string`
- `size_bytes: int`
- `metadata: jsonb`
- `text: text`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.6 Chunk

- `id: UUID`
- `document_id: UUID` (FK)
- `position: int`
- `text: text`
- `tags: text[]`
- `embedding_id: UUID` (FK)
- `created_at: timestamp`

### 2.7 Embedding

- `id: UUID`
- `chunk_id: UUID` (FK)
- `vector: float[]` (stored in vector DB or via reference)
- `created_at: timestamp`

### 2.8 Data source

- `id: UUID`
- `workspace_id: UUID` (FK)
- `name: string`
- `schema: jsonb`
- `row_count: int`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.9 Integration config

- `id: UUID`
- `workspace_id: UUID` (FK)
- `type: enum('REST','SQL')`
- `config: jsonb` (encrypted)
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.10 Workflow

- `id: UUID`
- `workspace_id: UUID` (FK)
- `name: string`
- `description: string`
- `created_at: timestamp`
- `updated_at: timestamp`

### 2.11 Workflow step

- `id: UUID`
- `workflow_id: UUID` (FK)
- `position: int`
- `type: enum('ASK_REFERENCE','ASK_DATA','INTEGRATION','HUMAN')`
- `assistant_id: UUID` (FK, assistant acting as teammate)
- `instruction: text`
- `config: jsonb`
- `created_at: timestamp`

---

## 3. API design

All APIs are REST, JSON, and scoped by tenant and workspace.

### 3.1 Tenant APIs

- `POST /tenants` — create tenant
- `GET /tenants/:tenantId` — get tenant
- `PATCH /tenants/:tenantId` — update tenant
- `DELETE /tenants/:tenantId` — delete (soft) tenant

### 3.2 Workspace APIs

- `POST /tenants/:tenantId/workspaces`
- `GET /tenants/:tenantId/workspaces`
- `GET /tenants/:tenantId/workspaces/:workspaceId`
- `PATCH /tenants/:tenantId/workspaces/:workspaceId`
- `DELETE /tenants/:tenantId/workspaces/:workspaceId`

### 3.3 Assistant APIs

- `POST /workspaces/:workspaceId/assistants`
- `GET /workspaces/:workspaceId/assistants/:assistantId`
- `PATCH /workspaces/:workspaceId/assistants/:assistantId`
- `DELETE /workspaces/:workspaceId/assistants/:assistantId`

### 3.4 Ask for Reference

- `POST /assistants/:assistantId/ask-reference`
  - Request: `{ "query": "..." }`
  - Response: `{ "chunks": [...], "summary": "...", "sources": [...] }`

### 3.5 Ask for Data

- `POST /assistants/:assistantId/ask-data`
  - Request: `{ "query": "..." }`
  - Response: `{ "sql": "...", "rows": [...], "summary": "..." }`

### 3.6 Workflow execution

- `POST /workflows/:workflowId/execute`
  - Request: `{ "input": {...} }`
  - Response: execution result and logs

---

## 4. Engine design

### 4.1 Chunking engine

- Input: raw text, chunk configuration
- Output: ordered chunks
- Rules:
  - Deterministic boundaries
  - Stable ordering
  - No randomness

### 4.2 Embedding engine

- Input: chunk text
- Output: embedding vector
- Rules:
  - Deterministic for identical text
  - Stored in vector DB linked to chunk

### 4.3 Retrieval engine (Ask for Reference)

Steps:
1. Embed query
2. Vector search over chunk embeddings
3. Apply tag filters (if any)
4. Merge overlapping/adjacent chunks
5. Rank deterministically
6. Return chunks + summary

### 4.4 SQL engine (Ask for Data)

Steps:
1. Interpret natural-language question
2. Generate SQL using schema
3. Validate SQL (columns, types, injection safety)
4. Execute SQL
5. Return rows + summary

### 4.5 Integration engine

REST:
- HTTPS only
- Config-driven endpoint, headers, auth
- JSON parsing
- Sanitized logging

SQL:
- TLS-secured connection
- Parameterized queries
- Sanitized logging

---

## 5. Workflow engine design

### 5.1 Execution model

- Steps executed in ascending `position`
- Each step receives:
  - Workflow input
  - Previous step outputs
- Errors stop execution and are logged

### 5.2 Assistant as teammate

- A teammate is: assistant + role + step-level instruction
- No separate teammate entity
- Workflow step references `assistant_id`

### 5.3 AI-recommended orchestration

- Builder provides workflow goal
- AI proposes:
  - Assistants
  - Step order
  - Step instructions
- Builder must confirm or edit before saving

### 5.4 Human-in-loop steps

- Type: `HUMAN`
- Execution pauses
- Builder reviews context and output
- Builder approves, edits, or cancels
- Workflow resumes or stops accordingly

---

## 6. Security design

### 6.1 Encryption

- TLS for all external communication
- TDE for database at rest
- AES-256 column-level encryption for secrets and credentials

### 6.2 Isolation

- Tenant ID required on all tenant-scoped operations
- Workspace ID required on all workspace-scoped operations
- No cross-tenant or cross-workspace queries

### 6.3 Logging

- No secrets, credentials, or raw document text in logs
- Only IDs, metadata, and high-level status

---

## 7. Frontend design

### 7.1 Stack

- Next.js
- React
- TypeScript

### 7.2 Main views

- Tenant/workspace selector
- Assistant list and editor
- Reference and document manager
- Data source manager
- Integration configuration
- Workflow builder and execution view
- Chat interface (Ask for Reference, Ask for Data, workflow triggers)

---

## 8. Audit & observability design

### 8.1 Audit log

Fields:
- `id: UUID`
- `tenant_id: UUID`
- `workspace_id: UUID`
- `user_id: UUID`
- `action: string`
- `payload: jsonb`
- `timestamp: timestamp`

### 8.2 Observability

- Request tracing
- Error tracking
- Performance metrics (chunking, search, SQL, workflow execution)

---

## 9. Non-functional design

- Deterministic behavior for chunking, embeddings, retrieval ranking
- Performance targets for latency and throughput
- Horizontal scalability for API and vector DB
- Clear separation of concerns between services and storage
