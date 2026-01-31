# Test Scenarios (TS)
# OYL — Multi‑Tenant, Workspace‑Centric Enterprise AI Platform

This document defines the high‑level test scenarios required to validate the OYL platform.
Each scenario represents a functional or non‑functional behavior that will be expanded into detailed test cases (TC.md).

---

# 1. Tenant Scenarios (TENANT_SUITE)

## TS‑TEN‑001 — Create Tenant
Validate tenant creation with required metadata.

## TS‑TEN‑002 — Retrieve Tenant
Validate tenant retrieval and metadata visibility.

## TS‑TEN‑003 — Update Tenant
Validate tenant metadata updates and encryption.

## TS‑TEN‑004 — Delete Tenant
Validate tenant soft‑deletion and cascading behavior.

## TS‑TEN‑005 — Tenant Isolation
Ensure no cross‑tenant access to any object.

---

# 2. Workspace Scenarios (WORKSPACE_SUITE)

## TS‑WSP‑001 — Create Workspace
Validate workspace creation under a tenant.

## TS‑WSP‑002 — Retrieve Workspace
Validate workspace metadata and object listing.

## TS‑WSP‑003 — Update Workspace
Validate workspace updates.

## TS‑WSP‑004 — Delete Workspace
Validate workspace deletion and cascading behavior.

## TS‑WSP‑005 — Workspace Isolation
Ensure no cross‑workspace access.

---

# 3. Assistant Scenarios (ASSISTANT_SUITE)

## TS‑AST‑001 — Create Assistant
Validate assistant creation with instruction and AI‑refined instruction.

## TS‑AST‑002 — Retrieve Assistant
Validate assistant metadata and linked objects.

## TS‑AST‑003 — Update Assistant
Validate updates and regeneration of AI‑refined instruction.

## TS‑AST‑004 — Delete Assistant
Validate deletion and workflow detachment.

## TS‑AST‑005 — Assistant as Teammate
Validate assistant assignment to workflow steps.

---

# 4. Reference & Document Scenarios (REFERENCE_SUITE)

## TS‑REF‑001 — Create Reference
Validate reference creation.

## TS‑REF‑002 — Upload Document
Validate document upload, extraction, and metadata.

## TS‑REF‑003 — Retrieve Reference
Validate reference metadata and document listing.

## TS‑REF‑004 — Delete Reference
Validate reference deletion and cascading behavior.

---

# 5. Document Processing Scenarios (DOCUMENT_SUITE)

## TS‑DOC‑001 — Extract Text
Validate text extraction from supported formats.

## TS‑DOC‑002 — Extract Metadata
Validate metadata extraction (title, author, page count).

## TS‑DOC‑003 — Unsupported File Types
Validate error handling for unsupported formats.

---

# 6. Chunking Scenarios (CHUNK_SUITE)

## TS‑CHK‑001 — Deterministic Chunking
Validate identical input → identical chunks.

## TS‑CHK‑002 — Chunk Ordering
Validate correct position indexing.

## TS‑CHK‑003 — Chunk Size Rules
Validate chunk boundaries and size constraints.

## TS‑CHK‑004 — Chunk Storage
Validate chunk persistence and linking.

---

# 7. Tagging Scenarios (TAG_SUITE)

## TS‑TAG‑001 — Manual Tagging
Validate manual tag creation and updates.

## TS‑TAG‑002 — AI Tagging
Validate AI‑generated tags.

## TS‑TAG‑003 — Tag Merge Logic
Validate deduplication and normalization.

---

# 8. Embedding Scenarios (EMBEDDING_SUITE)

## TS‑EMB‑001 — Generate Embeddings
Validate embedding generation for each chunk.

## TS‑EMB‑002 — Deterministic Embeddings
Validate identical text → identical embeddings.

## TS‑EMB‑003 — Embedding Storage
Validate embedding persistence and linking.

---

# 9. Ask for Reference Scenarios (ASK_REFERENCE_SUITE)

## TS‑AFR‑001 — Semantic Search
Validate embedding‑based retrieval.

## TS‑AFR‑002 — Tag Filtering
Validate tag‑based filtering.

## TS‑AFR‑003 — Chunk Merging
Validate merging of overlapping/adjacent chunks.

## TS‑AFR‑004 — Ranking Determinism
Validate deterministic ranking.

## TS‑AFR‑005 — Summary Generation
Validate LLM summary generation.

---

# 10. Data Source Scenarios (DATASOURCE_SUITE)

## TS‑DS‑001 — Upload Data Source
Validate CSV/XLSX ingestion.

## TS‑DS‑002 — Schema Extraction
Validate column/type extraction.

## TS‑DS‑003 — Row Storage
Validate row ingestion and normalization.

---

# 11. Ask for Data Scenarios (ASK_DATA_SUITE)

## TS‑AFD‑001 — Natural‑Language SQL Generation
Validate SQL generation from NL queries.

## TS‑AFD‑002 — SQL Validation
Validate column/type safety and injection prevention.

## TS‑AFD‑003 — SQL Execution
Validate SQL execution and row retrieval.

## TS‑AFD‑004 — Summary Generation
Validate LLM summary generation.

---

# 12. Integration Config Scenarios (INTEGRATION_CONFIG_SUITE)

## TS‑ICF‑001 — Create Integration Config
Validate REST/SQL config creation.

## TS‑ICF‑002 — Encrypt Sensitive Fields
Validate AES‑256 encryption.

## TS‑ICF‑003 — Validate Config
Validate endpoint, method, headers, and auth.

---

# 13. Integration Execution Scenarios (INTEGRATION_EXEC_SUITE)

## TS‑IEX‑001 — Execute REST Integration
Validate HTTPS request execution.

## TS‑IEX‑002 — Execute SQL Integration
Validate secure SQL execution.

## TS‑IEX‑003 — Error Handling
Validate retries, timeouts, and sanitized logs.

---

# 14. Workflow Scenarios (WORKFLOW_SUITE)

## TS‑WF‑001 — Create Workflow
Validate workflow creation.

## TS‑WF‑002 — Add Steps
Validate step creation and ordering.

## TS‑WF‑003 — Execute Workflow
Validate sequential execution.

## TS‑WF‑004 — Branching Logic
Validate conditional branching.

## TS‑WF‑005 — Human‑in‑Loop
Validate pause/resume behavior.

---

# 15. Teammate Orchestration Scenarios (TEAMMATE_SUITE)

## TS‑TMT‑001 — Manual Assistant Selection
Validate builder‑selected teammates.

## TS‑TMT‑002 — AI‑Recommended Assistants
Validate AI‑generated orchestration.

## TS‑TMT‑003 — Human Confirmation
Validate human approval before execution.

---

# 16. Security Scenarios (SECURITY_SUITE)

## TS‑SEC‑001 — Tenant Isolation
Validate strict tenant boundaries.

## TS‑SEC‑002 — Workspace Isolation
Validate workspace boundaries.

## TS‑SEC‑003 — Encryption at Rest
Validate TDE and AES‑256.

## TS‑SEC‑004 — TLS Enforcement
Validate HTTPS/TLS 1.3.

## TS‑SEC‑005 — Log Sanitization
Validate no sensitive data in logs.

---

# 17. Performance Scenarios (PERFORMANCE_SUITE)

## TS‑PER‑001 — Chunking Throughput
Validate chunking speed.

## TS‑PER‑002 — Vector Search Latency
Validate embedding search latency.

## TS‑PER‑003 — SQL Execution Latency
Validate SQL performance.

## TS‑PER‑004 — Workflow Execution Time
Validate workflow performance.

---

# 18. Frontend Scenarios (FRONTEND_SUITE)

## TS‑FE‑001 — Workspace Navigation
Validate workspace switching.

## TS‑FE‑002 — Assistant Editor
Validate assistant creation/editing.

## TS‑FE‑003 — Reference Manager
Validate document upload and viewing.

## TS‑FE‑004 — Data Source Manager
Validate schema/row display.

## TS‑FE‑005 — Workflow Builder
Validate step creation and teammate assignment.

## TS‑FE‑006 — Chat Interface
Validate Ask for Reference, Ask for Data, and workflow triggers.

---

# 19. End‑to‑End Scenarios (END_TO_END_SUITE)

## TS‑E2E‑001 — RAG End‑to‑End
Upload → chunk → embed → retrieve → summarize.

## TS‑E2E‑002 — Data End‑to‑End
Upload → schema → SQL → rows → summary.

## TS‑E2E‑003 — Workflow End‑to‑End
Create → assign teammates → execute → log.

## TS‑E2E‑004 — Integration End‑to‑End
Config → validate → execute → return data.
