# OYL — Multi‑Tenant, Workspace‑Centric Enterprise AI Platform

OYL is a configurable, multi‑tenant enterprise AI platform that enables organizations to build domain‑specific copilots, orchestrate multi‑assistant workflows, and unify knowledge, data, and integrations inside a single workspace‑centric environment.

OYL treats **assistants as configuration**, **capabilities as engines**, and **workspaces as the center of gravity**, enabling scalable, deterministic, and secure AI operations across an entire organization.

---

# 1. Key Features

## 1.1 Multi‑Tenant Architecture
- Full tenant isolation
- Encrypted metadata
- No cross‑tenant access

## 1.2 Workspace‑Centric Design
Each workspace contains:
- Assistants
- References
- Data sources
- Integrations
- Workflows

Workspaces act as functional domains (e.g., Procurement, Finance, HR).

## 1.3 Configurable Assistants
Assistants are AI agents defined by:
- Human instruction
- AI‑refined instruction
- Settings (JSON)
- Linked references, data sources, and integrations

Assistants do not contain logic — they configure platform capabilities.

## 1.4 Reference Management (RAG)
- Upload documents
- Extract text, metadata, chunks, embeddings
- AI + manual tagging
- Deterministic chunking
- Retrieval‑augmented generation (Ask for Reference)

## 1.5 Data Source Intelligence
- Upload CSV/XLSX
- Schema extraction
- SQL generation
- SQL execution
- Natural‑language data analysis (Ask for Data)

## 1.6 Integrations
- REST API integrations
- SQL database integrations
- Encrypted credentials
- Validated execution

## 1.7 Workflow Orchestration
- Multi‑step workflows
- Ask for Reference
- Ask for Data
- Integrations
- Human‑in‑loop approvals
- Logging and auditability

## 1.8 Team‑of‑Assistants (Teammate Mode)
Assistants collaborate inside workflows as **teammates**:
- Builder manually selects assistants
- Or AI recommends assistants
- Human confirms orchestration
- Assistants execute steps sequentially

Teammate is a **role**, not a core entity.

---

# 2. Platform Philosophy

OYL is built on three principles:

1. **Assistants are configuration** — not code.
2. **Capabilities are engines** — deterministic, reusable, secure.
3. **Workspaces are the center of gravity** — everything belongs to a workspace.

This enables OYL to scale into a Copilot‑like ecosystem with multiple surfaces and domain copilots.

---

# 3. High‑Level Architecture
Tenant
Workspace
Assistant
Reference
Document
Chunk
Embedding
Tag
Data Source
Schema
Rows
Integration
Config
Execution
Workflow
Steps
Assistant (as Teammate)

---

# 4. Core Capabilities

### Retrieval‑Augmented Generation
Deterministic chunking + embeddings + tag filtering.

### Natural‑Language SQL
Schema‑aware SQL generation and execution.

### Integration Execution
Secure REST and SQL calls with encrypted credentials.

### Workflow Automation
Multi‑assistant orchestration with human‑in‑loop control.

---

# 5. Security

- Tenant isolation
- Workspace scoping
- TLS 1.3
- TDE (encryption at rest)
- AES‑256 column‑level encryption
- Sanitized logs
- No cross‑tenant leakage

---

# 6. Performance

- Fast chunking
- Low‑latency vector search
- Efficient SQL execution
- Responsive frontend

Performance thresholds are defined in the Test Plan.

---

# 7. Repository Structure (Recommended)
/backend
/src
/tests
/migrations
/frontend
/app
/components
/hooks
/docs
OYL_DESCRIPTION.md
PRS.md
FS.md
DS.md
TP.md
TS.md
TD.md
TC.md

---

# 8. Documentation Set

This repository includes:

- **OYL_DESCRIPTION.md** — Platform overview
- **README.md** — This file
- **PRS.md** — Product Requirements Specification
- **FS.md** — Functional Specification
- **DS.md** — Design Specification
- **TP.md** — Test Plan
- **TS.md** — Test Scenarios
- **TD.md** — Test Data
- **TC.md** — Test Cases (200–400 rows, execution‑ready)

---

# 9. Status

OYL is under active development.
All architecture, specifications, and test assets follow a deterministic, copy‑paste‑ready workflow to ensure consistency across the entire platform.
