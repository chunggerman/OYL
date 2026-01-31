# Low-Level Technical Design (LLD)
# OYL — Multi-Tenant, Workspace-Centric Enterprise AI Platform

---

## 1. Database Schema

### tenants
- id (UUID, PK)
- name (string)
- metadata_encrypted (jsonb)
- created_at
- updated_at
- deleted_at

### workspaces
- id (UUID, PK)
- tenant_id (FK → tenants)
- name
- description
- created_at
- updated_at
- deleted_at

### assistants
- id (UUID, PK)
- workspace_id (FK)
- name
- instruction
- ai_instruction
- settings_json (jsonb)
- created_at
- updated_at
- deleted_at

### references
- id
- workspace_id (FK)
- name
- description
- created_at
- updated_at
- deleted_at

### documents
- id
- reference_id (FK)
- filename
- mime_type
- size_bytes
- metadata_json
- text
- created_at
- updated_at
- deleted_at

### chunks
- id
- document_id (FK)
- position
- text
- tags_text[] ← chunk-level tags
- created_at
- deleted_at

### embeddings
- id
- chunk_id (FK)
- vector_ref (pointer to vector DB)
- created_at

### tags
- id
- reference_id (FK)
- tag (string, normalized lowercase)
- source (enum: 'manual', 'ai')
- created_at

### tag_links
- id
- tag_id (FK)
- chunk_id (FK)
- created_at

### data_sources
- id
- workspace_id (FK)
- name
- schema_json
- row_count
- created_at
- updated_at
- deleted_at

### integration_configs
- id
- workspace_id (FK)
- type_enum ('REST', 'SQL')
- config_encrypted_json
- created_at
- updated_at
- deleted_at

### workflows
- id
- workspace_id (FK)
- name
- description
- created_at
- updated_at
- deleted_at

### workflow_steps
- id
- workflow_id (FK)
- position
- type_enum ('ASK_REFERENCE', 'ASK_DATA', 'INTEGRATION', 'HUMAN')
- assistant_id (FK)
- instruction
- config_json
- created_at
- deleted_at

### audit_logs
- id
- tenant_id
- workspace_id
- user_id
- action
- payload_json
- created_at

---

## 2. API Definitions

All APIs are REST, JSON, versioned under `/api/v1`.

### Tenants
- `POST /tenants`
- `GET /tenants/:tenantId`
- `PATCH /tenants/:tenantId`
- `DELETE /tenants/:tenantId`

### Workspaces
- `POST /tenants/:tenantId/workspaces`
- `GET /tenants/:tenantId/workspaces`
- `GET /tenants/:tenantId/workspaces/:workspaceId`
- `PATCH /tenants/:tenantId/workspaces/:workspaceId`
- `DELETE /tenants/:tenantId/workspaces/:workspaceId`

### Assistants
- `POST /workspaces/:workspaceId/assistants`
- `GET /workspaces/:workspaceId/assistants`
- `GET /workspaces/:workspaceId/assistants/:assistantId`
- `PATCH /workspaces/:workspaceId/assistants/:assistantId`
- `DELETE /workspaces/:workspaceId/assistants/:assistantId`
- `POST /assistants/:assistantId/ask-reference`
- `POST /assistants/:assistantId/ask-data`

### References & Documents
- `POST /workspaces/:workspaceId/references`
- `GET /workspaces/:workspaceId/references`
- `POST /references/:referenceId/documents`
- `GET /references/:referenceId/documents`

### Tagging
- `POST /references/:referenceId/tags`
- `DELETE /references/:referenceId/tags/:tagId`
- `GET /references/:referenceId/tags`
- `GET /documents/:documentId/chunks` → includes `tags_text[]`

### Data Sources
- `POST /workspaces/:workspaceId/data-sources`
- `GET /workspaces/:workspaceId/data-sources`
- `GET /data-sources/:dataSourceId/schema`
- `GET /data-sources/:dataSourceId/rows`

### Integrations
- `POST /workspaces/:workspaceId/integrations`
- `POST /integrations/:integrationId/execute`

### Workflows
- `POST /workspaces/:workspaceId/workflows`
- `POST /workflows/:workflowId/steps`
- `POST /workflows/:workflowId/execute`
- `POST /workflows/:workflowId/resume`
- `POST /workflows/:workflowId/cancel`
---

## 3. Component Logic

### 3.1 TenantService
- Create, update, delete tenants
- Enforce soft delete
- Emit audit logs

### 3.2 WorkspaceService
- Create, update, delete workspaces
- Enforce tenant scoping
- Cascade soft delete

### 3.3 AssistantService
- Create, update, delete assistants
- Generate `ai_instruction` via LLM
- Enforce workspace scoping

### 3.4 ReferenceService
- Create, update, delete references
- Manage tags (manual + AI)
- Link to documents

### 3.5 DocumentService
- Handle uploads
- Store in blob
- Extract text + metadata
- Enqueue chunking

### 3.6 ChunkService
- Deterministic chunking
- Store chunks with `position`
- Link to document
- Store `tags_text[]`

### 3.7 EmbeddingService
- Generate deterministic embeddings
- Store in vector DB
- Link via `vector_ref`

### 3.8 TagService
- Normalize + deduplicate tags
- Store in `tags` table
- Link to chunks via `tag_links`
- Merge manual + AI tags

### 3.9 RAGService (Ask for Reference)
- Embed query
- Vector search
- Tag filtering
- Merge overlapping chunks
- Rank deterministically
- Summarize via LLM

### 3.10 DataSourceService
- Ingest CSV/XLSX
- Infer schema
- Store rows
- Track row_count

### 3.11 SQLService (Ask for Data)
- NL → SQL generation
- Validate columns, types, injection
- Execute SQL
- Summarize results

### 3.12 IntegrationService
- Execute REST/SQL integrations
- Handle retries + timeouts
- Sanitize logs

### 3.13 WorkflowService
- Create workflows + steps
- Execute sequentially
- Pause/resume for human-in-loop
- Log each step

### 3.14 AuditService
- Append audit logs for all mutations
- Store `action`, `payload`, `user_id`, `timestamp`

---

## 4. Repository Structure (Expanded One Level Down)

/oyl
├── apps
│   ├── web
│   │   ├── components
│   │   ├── pages
│   │   ├── hooks
│   │   ├── styles
│   │   ├── utils
│   ├── api
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── services
│   │   ├── dto
│   │   ├── errors
├── packages
│   ├── core-domain
│   │   ├── entities
│   │   ├── value-objects
│   │   ├── domain-services
│   ├── persistence
│   │   ├── models
│   │   ├── repositories
│   │   ├── migrations
│   ├── rag-engine
│   │   ├── chunker
│   │   ├── embedder
│   │   ├── retriever
│   │   ├── ranker
│   ├── sql-engine
│   │   ├── nlp
│   │   ├── validators
│   │   ├── executors
│   ├── workflow-engine
│   │   ├── orchestrator
│   │   ├── executors
│   │   ├── state
│   ├── integration-core
│   │   ├── rest
│   │   ├── sql
│   │   ├── auth
│   ├── shared
│   │   ├── types
│   │   ├── utils
│   │   ├── logging
│   │   ├── config
├── infra
│   ├── docker
│   │   ├── Dockerfile.api
│   │   ├── Dockerfile.web
│   │   ├── docker-compose.yml
│   ├── ci
│   │   ├── github-actions
│   │   │   ├── build.yml
│   │   │   ├── test.yml
│   │   │   ├── deploy.yml
├── README.md
├── DS.md
├── LLD.md
├── TP.md
├── TS.md
├── TD.md
├── TC.md
---

# 5. Coding Standards & CI/CD Pipeline

## 5.1 Coding Standards

### Language & Style
- TypeScript across backend and frontend
- Strict mode enabled ("strict": true)
- ESLint + Prettier enforced
- No `any` in domain or persistence layers
- No circular dependencies
- No business logic inside controllers

### Architectural Rules
- Controllers → DTO validation → Services → Repositories
- Repositories are the only layer allowed to access the database
- Vector DB access only inside rag-engine
- Blob storage access only inside DocumentService
- LLM calls only inside AssistantService, RAGService, SQLService

### Error Handling
Centralized error middleware.
Standard error shape:

```ts
{
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
### Logging

Structured JSON logging is required across all backend services.

Logging rules:
- Logs must be emitted in JSON format.
- Logs must never contain secrets or credentials.
- Logs must never contain raw document text.
- Logs must never contain embeddings or vector values.
- Logs must never contain LLM prompts or responses in full.
- Logs must include request identifiers and timestamps.
- Logs must include tenant_id and workspace_id when available.
- Allowed log levels: debug, info, warn, error.

---

### Security Rules

- Secrets must be stored in environment variables or a secrets manager.
- Sensitive database fields must use AES‑256 encryption.
- TLS must be enforced for all external calls.
- All API inputs must be validated before processing.
- No cross‑tenant or cross‑workspace access is permitted.
- No direct access to DB, vector DB, or blob storage outside designated services.

---

# 5.2 CI/CD Pipeline (GitHub Actions)

### Pipeline Overview

The CI/CD pipeline runs on:
- Pull Requests
- Pushes to main
- Release tags (v*)

### Pipeline Jobs

#### Lint
- Run ESLint.
- Run Prettier formatting checks.

#### Type Check
- Run TypeScript compiler in no‑emit mode.

#### Unit Tests
- Run Jest/Vitest.
- Enforce coverage thresholds.

#### Integration Tests
- Start Postgres, vector DB, and blob store via Docker.
- Run integration tests against real services.

#### Security Scanning
- Dependency scanning.
- Secret scanning.
- Static analysis (CodeQL).

#### Build
- Build backend.
- Build frontend.
- Build Docker images.

#### Push Images
- Push images to container registry.

#### Deploy to Staging
- Automated deployment via CI.
- Docker Compose on staging VM.
- Run smoke tests.

#### Deploy to Production
- Manual approval required.
- Docker Compose deployment.
- Run post‑deploy smoke tests.

---

# 6. Deployment Environments (Docker-Based)

## 6.1 Local Development

Tools:
- Docker Compose
- Local .env files

Services:
- API container
- Web container
- Postgres
- Vector DB
- MinIO (blob storage)
- Optional reverse proxy

Developer Experience:
- Hot reload for API and web
- Seed scripts for test data
- Local logs stored in /logs

---

## 6.2 Staging Environment

Purpose:
- Integration testing
- E2E testing
- Performance sampling
- Pre‑production validation

Deployment:
- Automated via CI
- Docker Compose on staging VM
- Uses staging secrets

Observability:
- Centralized logs
- Metrics dashboard
- Alerts for:
  - API latency
  - RAG latency
  - SQL latency
  - Workflow failures

---

## 6.3 Production Environment

Architecture:
- Docker Compose on managed VM cluster
- Components:
  - API container
  - Web container
  - Managed Postgres
  - Vector DB cluster
  - S3-compatible blob storage
  - Traefik or Nginx reverse proxy

Security:
- TLS termination at reverse proxy
- Private network for DB, vector DB, and blob storage
- No public DB endpoints
- Secrets injected via environment variables

Observability:
- Centralized logging (ELK or Loki)
- Metrics (Prometheus or Grafana)
- Alerts for:
  - Error rate
  - Latency
  - Workflow failures
  - Vector DB failures
  - Disk usage

Backup & Recovery:
- Daily Postgres backups
- Blob storage versioning
- Vector DB snapshots
- Disaster recovery runbook

---
