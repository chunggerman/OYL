# Test Data (TD)
# OYL — Multi‑Tenant, Workspace‑Centric Enterprise AI Platform

This document defines the *requirements* for test data used across all test scenarios (TS) and test cases (TC).
It does not prescribe specific fictional companies, documents, or datasets.
Instead, it defines the categories, formats, constraints, and coverage needed to validate the OYL platform.

---

# 1. Document Test Data Requirements

## 1.1 Supported Formats
Test data must include documents in:
- PDF
- DOCX
- TXT

## 1.2 Content Categories
Documents must cover:
- Policy‑style text (long‑form, structured)
- Transactional text (invoices, orders, forms)
- Short notes (1–2 paragraphs)
- Irrelevant content (for negative RAG tests)

## 1.3 Structural Requirements
Documents must include:
- Headings
- Paragraphs
- Tables (at least one document)
- Lists (ordered or unordered)

## 1.4 Size Requirements
- Small: < 1 KB
- Medium: 10–50 KB
- Large: 100–500 KB
- Very large: > 1 MB (for performance testing)

## 1.5 Edge Cases
- Empty or near‑empty file
- Corrupted file
- Unsupported format (for error handling)

---

# 2. Data Source Test Data Requirements

## 2.1 File Formats
- CSV
- XLSX

## 2.2 Schema Requirements
Datasets must include:
- Numeric columns
- Text columns
- Date columns
- Mixed‑type columns
- At least one dataset with > 10 columns

## 2.3 Data Volume Requirements
- Small dataset: < 50 rows
- Medium dataset: 500–1,000 rows
- Large dataset: 10,000–100,000 rows

## 2.4 Data Patterns
Datasets must include:
- Duplicate rows
- Missing values
- Out‑of‑range values
- Multiple categories for grouping
- At least one dataset suitable for JOIN testing

## 2.5 Negative Cases
- Invalid CSV (broken rows)
- Invalid XLSX (corrupted)
- Mismatched schema vs content

---

# 3. Integration Test Data Requirements

## 3.1 REST Integrations
Mock APIs must include:
- Successful responses
- Error responses (4xx, 5xx)
- Slow responses (for timeout testing)
- Responses with nested JSON
- Responses missing required fields

## 3.2 SQL Integrations
Mock SQL databases must include:
- At least two tables with FK relationships
- Numeric, text, and date columns
- At least one table with > 10,000 rows (performance)
- At least one table with NULLs and inconsistent data

---

# 4. Workflow Test Data Requirements

Workflows must be tested with:
- Single‑step workflows
- Multi‑step workflows (5–10 steps)
- Mixed workflows (RAG + SQL + Integration)
- Workflows requiring human‑in‑loop
- Workflows with branching logic

Inputs must include:
- Natural‑language questions
- Structured JSON payloads
- Missing or malformed inputs (negative tests)

---

# 5. Assistant Test Data Requirements

Assistants must be tested with:
- Simple instructions (1–2 sentences)
- Complex instructions (multi‑paragraph)
- Conflicting instructions (for refinement testing)
- Assistants linked to:
  - References only
  - Data sources only
  - Integrations only
  - Mixed resources

---

# 6. Tag Test Data Requirements

Tagging must be tested with:
- Manual tags
- AI‑generated tags
- Mixed tags
- Duplicate tags
- Case‑variant tags
- Empty tag sets

---

# 7. Performance Test Data Requirements

Performance tests require:
- Large documents (100+ pages)
- Large CSV/XLSX datasets (100k+ rows)
- Workflows with 20+ steps
- High‑volume RAG queries (batch testing)

---

# 8. Determinism Test Data Requirements

To validate deterministic behavior:
- Identical documents uploaded multiple times
- Identical queries executed multiple times
- Identical workflows executed multiple times

Expected:
- Identical chunks
- Identical embeddings
- Identical retrieval ranking
- Identical SQL generation
