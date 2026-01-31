# OYL — Platform Description for GitHub Copilot

OYL is a multi-tenant, workspace-centric enterprise AI platform designed to operate like a configurable Copilot system. It provides a unified environment where organizations can create assistants, upload references and data sources, configure integrations, and run workflows powered by deterministic backend logic and LLM-based reasoning.

This document gives GitHub Copilot the architectural context it needs to generate consistent code, tests, and documentation across the entire OYL platform.

---

# 1. Core Concepts

## 1.1 Tenant
A tenant represents an organization. All data is isolated at the tenant level.

Key properties:
- Unique tenant ID
- Encrypted metadata
- Strict isolation: no cross-tenant access

## 1.2 Workspace
A workspace is a functional unit inside a tenant (e.g., Procurement, Finance).

Workspaces contain:
- Assistants
- References
- Data sources
- Integrations
- Workflows

## 1.3 Assistant
An assistant is a configurable AI agent with:
- Name
- Description
- Instruction (human-written)
- AI-refined instruction (LLM-generated)
- Settings (JSON)
- Associated references, data sources, and integrations

Assistants do not store logic; they store configuration.
Capabilities are provided by the platform.

Assistants can act as **teammates** inside workflows, but “teammate” is not a separate entity — it is a role an assistant plays during orchestration.

---

# 2. Reference System

## 2.1 Reference
A reference is a container for documents.

Each reference has:
- Name
- Description
- Tags
- Documents

## 2.2 Document
A document is an uploaded file (PDF, DOCX, TXT, etc.).
The system extracts:
- Raw text
- Metadata
- Chunked text segments
- Embeddings
- AI-generated tags

## 2.3 Chunk
Chunks are deterministic text segments created from document text.

Properties:
- Position index (0,1,2…)
- Text content
- Embedding vector
- Tags (manual + AI)

Chunking must be deterministic: same input → same chunks.

## 2.4 Tagging
Tags come from:
- Manual user input
- AI-generated suggestions

Tags are merged and deduplicated.

## 2.5 Embeddings
Each chunk receives an embedding vector (e.g., 1536 dimensions).
Embeddings must be deterministic for identical text.

---

# 3. Data Source System

## 3.1 Data Source
A data source is a structured dataset (CSV, XLSX).
The system extracts:
- Schema (columns + types)
- Rows
- Normalized internal representation

## 3.2 Ask for Data
Users ask natural-language questions.
The system:
1. Interprets the question
2. Generates SQL
3. Executes SQL
4. Returns rows
5. Generates a summary

SQL must be safe, validated, and schema-aware.

---

# 4. Ask for Reference (RAG)

Ask for Reference performs retrieval-augmented generation:
1. Semantic search using embeddings
2. Tag-based filtering
3. Merge and rank results
4. Provide chunk excerpts
5. Generate a summary

The system must:
- Return relevant chunks
- Respect tenant/workspace boundaries
- Produce deterministic retrieval behavior

---

# 5. Integration System

## 5.1 Integration Config
Supports:
- API integrations (REST)
- SQL integrations (databases)

Config includes:
- Endpoint
- Method
- Headers
- Authentication
- Query parameters
- SQL connection details

All sensitive fields are encrypted.

## 5.2 Integration Execution
The system executes:
- HTTPS API calls
- TLS-secured SQL queries

It must:
- Validate inputs
- Sanitize logs
- Handle errors gracefully
- Never expose secrets

---

# 6. Workflow System

Workflows orchestrate multi-step operations:
- Ask for Reference
- Ask for Data
- Integrations
- Human-in-loop approvals

Workflows must:
- Execute steps in order
- Support branching
- Support pausing/resuming
- Log all actions

---

# 7. Security Architecture

OYL enforces:
- Tenant isolation
- Workspace scoping
- HTTPS/TLS 1.3
- Encryption at rest (TDE)
- Column-level AES-256 encryption
- Sanitized logs
- Strict RBAC (future)

No cross-tenant or cross-workspace leakage is allowed.

---

# 8. Performance Requirements

The platform must meet:
- Fast chunking throughput
- Low-latency vector search
- Efficient SQL execution
- Responsive frontend interactions

Performance thresholds are defined in the Test Plan.

---

# 9. Frontend Architecture

The frontend is a Next.js/React application with:
- Workspace navigation
- Assistant creation and configuration
- Reference and data source management
- Integration configuration
- Workflow builder
- Chat interface for interacting with assistants

The frontend communicates with the backend via REST APIs.

---

# 10. Assistant-Orchestrated Workflows (Teammate Mode)

OYL allows builders to orchestrate workflows by selecting and coordinating multiple assistants as teammates.

## 10.1 Teammate Is a Role, Not a Core Entity
A **Teammate** is:
- Not a new object type
- Not stored separately
- Not managed independently

A teammate is simply:

> **An Assistant acting in a workflow step with a specific role and instruction.**

## 10.2 Manual Assistant Selection
The builder can:
- Choose specific assistants for each workflow step
- Provide step-level instructions
- Define execution order
- Combine Ask for Reference, Ask for Data, and Integrations

This gives full control and transparency.

## 10.3 AI-Driven Assistant Selection
The platform can:
- Analyze the workflow goal
- Recommend suitable assistants
- Suggest step sequences
- Propose instructions for each step

## 10.4 Human-in-Loop Confirmation
Before execution:
- The builder reviews the AI’s proposed orchestration
- The builder can accept, modify, or reject
- No workflow runs without explicit human approval

## 10.5 Execution Model
During execution:
- Each assistant performs its assigned step
- Outputs flow to the next step
- Errors trigger human-in-loop intervention
- All actions are logged

This creates a **team-of-assistants** model where assistants collaborate like human teammates.

---

# 11. Platform Philosophy

OYL is built on three principles:

1. **Assistants are configuration** — not code.
2. **Capabilities are engines** — reusable, deterministic, and secure.
3. **Workspaces are the center of gravity** — everything belongs to a workspace.

This enables OYL to scale into a Copilot-like ecosystem with multiple surfaces and domain copilots.
