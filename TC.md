# Test Cases (TC)
# OYL — Multi‑Tenant, Workspace‑Centric Enterprise AI Platform

# 1. Tenant Test Cases (TENANT_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑TEN‑001 | TS‑TEN‑001 | Create tenant with valid metadata | None | 1. Send POST /tenants with valid name + metadata | Tenant created with unique ID; metadata encrypted |
| TC‑TEN‑002 | TS‑TEN‑001 | Create tenant with missing name | None | 1. POST /tenants with empty name | 400 error: name required |
| TC‑TEN‑003 | TS‑TEN‑001 | Create tenant with oversized metadata | None | 1. POST /tenants with >10KB metadata | 400 error: metadata too large |
| TC‑TEN‑004 | TS‑TEN‑002 | Retrieve existing tenant | Tenant exists | 1. GET /tenants/:id | Tenant metadata returned; encrypted fields not exposed |
| TC‑TEN‑005 | TS‑TEN‑002 | Retrieve non‑existent tenant | None | 1. GET /tenants/invalid | 404 error |
| TC‑TEN‑006 | TS‑TEN‑003 | Update tenant name | Tenant exists | 1. PATCH /tenants/:id with new name | Name updated; metadata preserved |
| TC‑TEN‑007 | TS‑TEN‑003 | Update tenant metadata | Tenant exists | 1. PATCH /tenants/:id with new metadata | Metadata encrypted and updated |
| TC‑TEN‑008 | TS‑TEN‑004 | Delete tenant | Tenant exists | 1. DELETE /tenants/:id | Tenant soft‑deleted; cascading soft‑delete triggered |
| TC‑TEN‑009 | TS‑TEN‑005 | Cross‑tenant isolation | Two tenants exist | 1. Use Tenant A token to GET Tenant B resources | 403 forbidden |
| TC‑TEN‑010 | TS‑TEN‑005 | Tenant boundary enforcement on nested objects | Tenant A + B exist | 1. Use Tenant A to GET Tenant B workspace | 403 forbidden |

---

# 2. Workspace Test Cases (WORKSPACE_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑WSP‑001 | TS‑WSP‑001 | Create workspace | Tenant exists | 1. POST /tenants/:id/workspaces | Workspace created |
| TC‑WSP‑002 | TS‑WSP‑001 | Create workspace with duplicate name | Workspace exists | 1. POST with same name | 409 conflict |
| TC‑WSP‑003 | TS‑WSP‑002 | Retrieve workspace | Workspace exists | 1. GET workspace | Metadata + object counts returned |
| TC‑WSP‑004 | TS‑WSP‑002 | Retrieve workspace list | Tenant exists | 1. GET /workspaces | List returned |
| TC‑WSP‑005 | TS‑WSP‑003 | Update workspace name | Workspace exists | 1. PATCH workspace | Name updated |
| TC‑WSP‑006 | TS‑WSP‑004 | Delete workspace | Workspace exists | 1. DELETE workspace | Workspace soft‑deleted; cascading soft‑delete |
| TC‑WSP‑007 | TS‑WSP‑005 | Cross‑workspace isolation | Two workspaces exist | 1. Access workspace B from workspace A context | 403 forbidden |
| TC‑WSP‑008 | TS‑WSP‑005 | Workspace boundary on assistants | Two workspaces exist | 1. GET assistant from another workspace | 403 forbidden |
| TC‑WSP‑009 | TS‑WSP‑005 | Workspace boundary on references | Two workspaces exist | 1. GET reference from another workspace | 403 forbidden |
| TC‑WSP‑010 | TS‑WSP‑005 | Workspace boundary on workflows | Two workspaces exist | 1. Execute workflow from another workspace | 403 forbidden |

---

# 3. Assistant Test Cases (ASSISTANT_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑AST‑001 | TS‑AST‑001 | Create assistant with valid instruction | Workspace exists | 1. POST assistant with name + instruction | Assistant created; AI‑refined instruction generated |
| TC‑AST‑002 | TS‑AST‑001 | Create assistant with missing instruction | Workspace exists | 1. POST assistant with empty instruction | 400 error |
| TC‑AST‑003 | TS‑AST‑001 | Create assistant with long instruction | Workspace exists | 1. POST assistant with >10k chars | 400 error |
| TC‑AST‑004 | TS‑AST‑002 | Retrieve assistant | Assistant exists | 1. GET assistant | All fields returned except encrypted ones |
| TC‑AST‑005 | TS‑AST‑002 | Retrieve assistant list | Workspace exists | 1. GET /assistants | List returned |
| TC‑AST‑006 | TS‑AST‑003 | Update assistant instruction | Assistant exists | 1. PATCH assistant with new instruction | AI‑refined instruction regenerated |
| TC‑AST‑007 | TS‑AST‑003 | Update assistant settings | Assistant exists | 1. PATCH assistant settings | Settings updated |
| TC‑AST‑008 | TS‑AST‑004 | Delete assistant | Assistant exists | 1. DELETE assistant | Assistant soft‑deleted; removed from workflows |
| TC‑AST‑009 | TS‑AST‑005 | Assign assistant as teammate | Assistant + workflow exist | 1. Add workflow step with assistant_id | Step created with assistant role |
| TC‑AST‑010 | TS‑AST‑005 | Assistant cannot be assigned across workspaces | Assistant in W1, workflow in W2 | 1. Add step referencing assistant from W1 | 403 forbidden |
| TC‑AST‑011 | TS‑AST‑005 | Assistant used in multiple steps | Assistant + workflow exist | 1. Add assistant to multiple steps | All steps valid |
| TC‑AST‑012 | TS‑AST‑005 | Assistant removed from workflow after deletion | Assistant used in workflow | 1. DELETE assistant | Workflow steps referencing assistant become invalid or removed |

---

# 4. Reference Test Cases (REFERENCE_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑REF‑001 | TS‑REF‑001 | Create reference with valid name | Workspace exists | POST /references with name | Reference created |
| TC‑REF‑002 | TS‑REF‑001 | Create reference with duplicate name | Reference exists | POST with same name | 409 conflict |
| TC‑REF‑003 | TS‑REF‑001 | Create reference with missing name | Workspace exists | POST with empty name | 400 error |
| TC‑REF‑004 | TS‑REF‑002 | Upload valid PDF | Reference exists | POST /documents with PDF | Document stored; text extracted |
| TC‑REF‑005 | TS‑REF‑002 | Upload valid DOCX | Reference exists | POST DOCX | Document stored; text extracted |
| TC‑REF‑006 | TS‑REF‑002 | Upload valid TXT | Reference exists | POST TXT | Document stored; text extracted |
| TC‑REF‑007 | TS‑REF‑002 | Upload unsupported file type | Reference exists | POST .exe | 415 unsupported media type |
| TC‑REF‑008 | TS‑REF‑002 | Upload oversized file | Reference exists | POST >100MB | 413 payload too large |
| TC‑REF‑009 | TS‑REF‑003 | Retrieve reference | Reference exists | GET /references/:id | Metadata + document list returned |
| TC‑REF‑010 | TS‑REF‑003 | Retrieve reference list | Workspace exists | GET /references | List returned |
| TC‑REF‑011 | TS‑REF‑004 | Delete reference | Reference exists | DELETE reference | Reference soft‑deleted; documents removed |
| TC‑REF‑012 | TS‑REF‑004 | Delete reference with documents | Reference + docs exist | DELETE reference | Cascading delete applied |

---

# 5. Document Processing Test Cases (DOCUMENT_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑DOC‑001 | TS‑DOC‑001 | Extract text from PDF | PDF uploaded | System extracts text | Text extracted successfully |
| TC‑DOC‑002 | TS‑DOC‑001 | Extract text from DOCX | DOCX uploaded | System extracts text | Text extracted successfully |
| TC‑DOC‑003 | TS‑DOC‑001 | Extract text from TXT | TXT uploaded | System extracts text | Text extracted successfully |
| TC‑DOC‑004 | TS‑DOC‑002 | Extract metadata from PDF | PDF uploaded | System extracts metadata | Metadata fields populated |
| TC‑DOC‑005 | TS‑DOC‑002 | Extract metadata from DOCX | DOCX uploaded | System extracts metadata | Metadata fields populated |
| TC‑DOC‑006 | TS‑DOC‑003 | Upload corrupted PDF | Corrupted file | POST document | 422 error: cannot extract text |
| TC‑DOC‑007 | TS‑DOC‑003 | Upload corrupted DOCX | Corrupted file | POST document | 422 error |
| TC‑DOC‑008 | TS‑DOC‑003 | Upload empty file | Empty file | POST document | 422 error: no text content |
| TC‑DOC‑009 | TS‑DOC‑003 | Upload file with unreadable encoding | Invalid encoding | POST document | 422 error |
| TC‑DOC‑010 | TS‑DOC‑003 | Upload file with mixed encodings | Mixed encoding | POST document | Partial extraction or 422 error |

---

# 6. Chunking Test Cases (CHUNK_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑CHK‑001 | TS‑CHK‑001 | Deterministic chunking (same file twice) | Same file uploaded twice | Compare chunk sets | Identical chunks |
| TC‑CHK‑002 | TS‑CHK‑001 | Deterministic chunking (same file, different workspace) | Upload same file in W1 and W2 | Compare chunks | Identical chunks |
| TC‑CHK‑003 | TS‑CHK‑002 | Chunk ordering | Document uploaded | GET chunks | Positions 0..N in order |
| TC‑CHK‑004 | TS‑CHK‑003 | Chunk size limit respected | Document uploaded | Inspect chunk lengths | All chunks ≤ configured size |
| TC‑CHK‑005 | TS‑CHK‑003 | Chunk boundary correctness | Document uploaded | Inspect boundaries | No overlap unless configured |
| TC‑CHK‑006 | TS‑CHK‑003 | Chunking long document | Large doc uploaded | System chunks | Performance threshold met |
| TC‑CHK‑007 | TS‑CHK‑003 | Chunking short document | Short doc uploaded | System chunks | 1 chunk created |
| TC‑CHK‑008 | TS‑CHK‑004 | Chunk storage | Document uploaded | GET chunks | All chunks persisted |
| TC‑CHK‑009 | TS‑CHK‑004 | Chunk linked to document | Document uploaded | GET chunk metadata | document_id correct |
| TC‑CHK‑010 | TS‑CHK‑004 | Chunk deletion on document delete | Document deleted | GET chunks | No chunks remain |
| TC‑CHK‑011 | TS‑CHK‑004 | Chunk deletion on reference delete | Reference deleted | GET chunks | No chunks remain |
| TC‑CHK‑012 | TS‑CHK‑003 | Chunking with special characters | Document with unicode | Upload | Chunking succeeds |

---

# 7. Tagging Test Cases (TAG_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑TAG‑001 | TS‑TAG‑001 | Add manual tag to reference | Reference exists | POST tag | Tag added |
| TC‑TAG‑002 | TS‑TAG‑001 | Add duplicate manual tag | Reference exists | POST same tag | Tag deduplicated |
| TC‑TAG‑003 | TS‑TAG‑001 | Add multiple manual tags | Reference exists | POST multiple tags | All added, deduped |
| TC‑TAG‑004 | TS‑TAG‑002 | AI tag generation on upload | Document uploaded | System generates tags | Tags present |
| TC‑TAG‑005 | TS‑TAG‑002 | AI tag generation for long doc | Large doc uploaded | System generates tags | Tags present |
| TC‑TAG‑006 | TS‑TAG‑003 | Merge manual + AI tags | Both exist | GET tags | Combined, deduped |
| TC‑TAG‑007 | TS‑TAG‑003 | Case‑insensitive dedupe | Tags: “Policy”, “policy” | Merge | Single normalized tag |
| TC‑TAG‑008 | TS‑TAG‑003 | Tag normalization | Mixed casing | Merge | Lowercase or normalized |
| TC‑TAG‑009 | TS‑TAG‑003 | Remove tag | Reference exists | DELETE tag | Tag removed |
| TC‑TAG‑010 | TS‑TAG‑003 | Remove non‑existent tag | Reference exists | DELETE tag | 404 error |
| TC‑TAG‑011 | TS‑TAG‑001 | Add tag with special characters | Reference exists | POST tag | Tag accepted or validated |
| TC‑TAG‑012 | TS‑TAG‑002 | AI tags for irrelevant document | Irrelevant doc | Upload | Tags reflect content |

---

# 8. Embedding Test Cases (EMBEDDING_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑EMB‑001 | TS‑EMB‑001 | Generate embedding for chunk | Chunk exists | System generates embedding | Embedding stored |
| TC‑EMB‑002 | TS‑EMB‑001 | Generate embeddings for all chunks | Document uploaded | System generates embeddings | All chunks have embeddings |
| TC‑EMB‑003 | TS‑EMB‑002 | Deterministic embeddings (same chunk twice) | Same chunk text | Compare embeddings | Identical vectors |
| TC‑EMB‑004 | TS‑EMB‑002 | Deterministic embeddings across workspaces | Same chunk text in W1/W2 | Compare | Identical vectors |
| TC‑EMB‑005 | TS‑EMB‑003 | Embedding linked to chunk | Chunk exists | GET embedding | chunk_id correct |
| TC‑EMB‑006 | TS‑EMB‑003 | Embedding deletion on chunk delete | Chunk deleted | GET embedding | Not found |
| TC‑EMB‑007 | TS‑EMB‑003 | Embedding deletion on reference delete | Reference deleted | GET embeddings | None remain |
| TC‑EMB‑008 | TS‑EMB‑001 | Embedding generation for unicode text | Chunk with unicode | Generate | Embedding created |
| TC‑EMB‑009 | TS‑EMB‑001 | Embedding generation for empty chunk | Empty chunk | Generate | 422 error |
| TC‑EMB‑010 | TS‑EMB‑001 | Embedding generation performance | Large doc | Generate | Within threshold |
| TC‑EMB‑011 | TS‑EMB‑002 | Embedding drift test | Same doc uploaded twice | Compare | Identical vectors |
| TC‑EMB‑012 | TS‑EMB‑003 | Embedding storage integrity | Chunk exists | Inspect | Vector stored correctly |

---

# 9. Ask for Reference Test Cases (ASK_REFERENCE_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑AFR‑001 | TS‑AFR‑001 | Basic semantic search | Reference + chunks exist | POST ask-reference with query | Relevant chunks returned |
| TC‑AFR‑002 | TS‑AFR‑001 | Semantic search with no matches | Reference exists | Query irrelevant | Empty result set |
| TC‑AFR‑003 | TS‑AFR‑001 | Semantic search across multiple references | Multiple references exist | Query spans topics | Combined ranked results |
| TC‑AFR‑004 | TS‑AFR‑001 | Semantic search with unicode | Reference contains unicode | Query unicode | Correct retrieval |
| TC‑AFR‑005 | TS‑AFR‑001 | Semantic search performance | Large reference | Query | Latency within threshold |
| TC‑AFR‑006 | TS‑AFR‑002 | Tag filtering (single tag) | Reference tagged | Query with tag filter | Only tagged chunks returned |
| TC‑AFR‑007 | TS‑AFR‑002 | Tag filtering (multiple tags) | Reference tagged | Query with multiple tags | Intersection applied |
| TC‑AFR‑008 | TS‑AFR‑002 | Tag filtering with no matches | Reference exists | Query with unmatched tag | Empty result |
| TC‑AFR‑009 | TS‑AFR‑003 | Chunk merging (adjacent) | Adjacent chunks retrieved | Query | Merged chunk group returned |
| TC‑AFR‑010 | TS‑AFR‑003 | Chunk merging (overlapping) | Overlapping chunks | Query | Overlap resolved deterministically |
| TC‑AFR‑011 | TS‑AFR‑004 | Ranking determinism (same query twice) | Reference exists | Run same query twice | Identical ranking |
| TC‑AFR‑012 | TS‑AFR‑004 | Ranking determinism across workspaces | Same reference in W1/W2 | Query both | Identical ranking |
| TC‑AFR‑013 | TS‑AFR‑004 | Ranking with identical scores | Equal similarity chunks | Query | Stable deterministic order |
| TC‑AFR‑014 | TS‑AFR‑005 | Summary generation | Reference exists | Query | Summary returned |
| TC‑AFR‑015 | TS‑AFR‑005 | Summary generation with long context | Large reference | Query | Summary within token limit |
| TC‑AFR‑016 | TS‑AFR‑005 | Summary generation with no chunks | No matches | Query | Empty summary or fallback |
| TC‑AFR‑017 | TS‑AFR‑001 | Ask-reference with malformed query | Reference exists | POST with invalid JSON | 400 error |
| TC‑AFR‑018 | TS‑AFR‑001 | Ask-reference with empty query | Reference exists | POST with empty string | 400 error |
| TC‑AFR‑019 | TS‑AFR‑001 | Ask-reference on deleted reference | Reference deleted | Query | 404 error |
| TC‑AFR‑020 | TS‑AFR‑001 | Ask-reference cross-workspace | Reference in W1, assistant in W2 | Query | 403 forbidden |

---

# 10. Data Source Test Cases (DATASOURCE_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑DS‑001 | TS‑DS‑001 | Upload valid CSV | Workspace exists | POST CSV | Data source created |
| TC‑DS‑002 | TS‑DS‑001 | Upload valid XLSX | Workspace exists | POST XLSX | Data source created |
| TC‑DS‑003 | TS‑DS‑001 | Upload empty CSV | Workspace exists | POST empty CSV | 422 error |
| TC‑DS‑004 | TS‑DS‑001 | Upload corrupted XLSX | Workspace exists | POST corrupted file | 422 error |
| TC‑DS‑005 | TS‑DS‑001 | Upload CSV with mixed delimiters | Workspace exists | POST CSV | Schema inferred or error |
| TC‑DS‑006 | TS‑DS‑002 | Schema extraction (numeric columns) | CSV uploaded | GET schema | Correct numeric types |
| TC‑DS‑007 | TS‑DS‑002 | Schema extraction (text columns) | CSV uploaded | GET schema | Correct text types |
| TC‑DS‑008 | TS‑DS‑002 | Schema extraction (date columns) | CSV uploaded | GET schema | Correct date types |
| TC‑DS‑009 | TS‑DS‑002 | Schema extraction (wide dataset) | CSV with >10 columns | GET schema | All columns detected |
| TC‑DS‑010 | TS‑DS‑003 | Row ingestion | CSV uploaded | GET rows | All rows present |
| TC‑DS‑011 | TS‑DS‑003 | Row ingestion with missing values | CSV uploaded | GET rows | Missing values preserved |
| TC‑DS‑012 | TS‑DS‑003 | Row ingestion with duplicates | CSV uploaded | GET rows | Duplicates preserved |
| TC‑DS‑013 | TS‑DS‑003 | Large dataset ingestion | CSV 100k rows | Upload | Performance threshold met |
| TC‑DS‑014 | TS‑DS‑001 | Upload dataset with invalid header row | Workspace exists | POST CSV | 422 error |
| TC‑DS‑015 | TS‑DS‑001 | Upload dataset with inconsistent row lengths | Workspace exists | POST CSV | 422 error |
| TC‑DS‑016 | TS‑DS‑001 | Upload dataset with unsupported encoding | Workspace exists | POST CSV | 422 error |
| TC‑DS‑017 | TS‑DS‑002 | Schema extraction determinism | Same CSV uploaded twice | Compare schema | Identical |
| TC‑DS‑018 | TS‑DS‑003 | Row count accuracy | CSV uploaded | GET metadata | row_count correct |
| TC‑DS‑019 | TS‑DS‑001 | Upload dataset >100MB | Workspace exists | POST CSV | 413 payload too large |
| TC‑DS‑020 | TS‑DS‑001 | Upload dataset with formula cells (XLSX) | Workspace exists | POST XLSX | Values extracted or error |

---

# 11. Ask for Data Test Cases (ASK_DATA_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑AFD‑001 | TS‑AFD‑001 | Basic SQL generation | Data source exists | Query: “total spend by vendor” | Valid SQL generated |
| TC‑AFD‑002 | TS‑AFD‑001 | SQL generation with grouping | Data source exists | Query: “group by month” | GROUP BY clause present |
| TC‑AFD‑003 | TS‑AFD‑001 | SQL generation with filtering | Data source exists | Query: “only approved” | WHERE status='Approved' |
| TC‑AFD‑004 | TS‑AFD‑001 | SQL generation with date range | Data source exists | Query: “2023 only” | WHERE date BETWEEN ... |
| TC‑AFD‑005 | TS‑AFD‑001 | SQL generation with JOIN | Two datasets exist | Query referencing both | JOIN generated |
| TC‑AFD‑006 | TS‑AFD‑002 | SQL validation (invalid column) | Data source exists | Query referencing missing column | 400 error |
| TC‑AFD‑007 | TS‑AFD‑002 | SQL validation (type mismatch) | Data source exists | Query mixing types | 400 error |
| TC‑AFD‑008 | TS‑AFD‑002 | SQL injection prevention | Query containing SQL injection | Execute | Injection blocked |
| TC‑AFD‑009 | TS‑AFD‑003 | SQL execution (valid) | Data source exists | Execute generated SQL | Rows returned |
| TC‑AFD‑010 | TS‑AFD‑003 | SQL execution (no rows) | Data source exists | Query with no matches | Empty result |
| TC‑AFD‑011 | TS‑AFD‑003 | SQL execution (large dataset) | Large dataset exists | Query | Performance threshold met |
| TC‑AFD‑012 | TS‑AFD‑004 | Summary generation | Data source exists | Query | Summary returned |
| TC‑AFD‑013 | TS‑AFD‑004 | Summary generation with large result set | Data source exists | Query | Summary within token limit |
| TC‑AFD‑014 | TS‑AFD‑001 | Ask-data with malformed query | Data source exists | POST invalid JSON | 400 error |
| TC‑AFD‑015 | TS‑AFD‑001 | Ask-data with empty query | Data source exists | POST empty string | 400 error |
| TC‑AFD‑016 | TS‑AFD‑001 | Ask-data cross-workspace | Data source in W1, assistant in W2 | Query | 403 forbidden |
| TC‑AFD‑017 | TS‑AFD‑001 | Ask-data on deleted data source | Data source deleted | Query | 404 error |
| TC‑AFD‑018 | TS‑AFD‑001 | Deterministic SQL generation | Same query twice | Compare SQL | Identical |
| TC‑AFD‑019 | TS‑AFD‑001 | SQL generation with ambiguous query | Data source exists | Query ambiguous | System chooses deterministic interpretation |
| TC‑AFD‑020 | TS‑AFD‑001 | SQL generation with unicode | Data source exists | Query unicode | Valid SQL generated |

---

# 12. Integration Config Test Cases (INTEGRATION_CONFIG_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑ICF‑001 | TS‑ICF‑001 | Create REST integration | Workspace exists | POST config | Integration created |
| TC‑ICF‑002 | TS‑ICF‑001 | Create SQL integration | Workspace exists | POST config | Integration created |
| TC‑ICF‑003 | TS‑ICF‑001 | Create integration with missing fields | Workspace exists | POST incomplete config | 400 error |
| TC‑ICF‑004 | TS‑ICF‑002 | Encrypt sensitive fields | Integration created | Inspect DB | Sensitive fields encrypted |
| TC‑ICF‑005 | TS‑ICF‑003 | Validate REST endpoint | Workspace exists | POST invalid URL | 400 error |
| TC‑ICF‑006 | TS‑ICF‑003 | Validate SQL connection string | Workspace exists | POST invalid DSN | 400 error |
| TC‑ICF‑007 | TS‑ICF‑003 | Validate HTTP method | Workspace exists | POST unsupported method | 400 error |
| TC‑ICF‑008 | TS‑ICF‑003 | Validate headers | Workspace exists | POST invalid headers | 400 error |
| TC‑ICF‑009 | TS‑ICF‑003 | Validate auth block | Workspace exists | POST invalid auth | 400 error |
| TC‑ICF‑010 | TS‑ICF‑001 | Create integration with large config | Workspace exists | POST large JSON | 413 error |

---

# 13. Integration Execution Test Cases (INTEGRATION_EXEC_SUITE)

| TC ID | Scenario ID | Title | Preconditions | Steps | Expected Result |
|-------|-------------|--------|----------------|--------|------------------|
| TC‑IEX‑001 | TS‑IEX‑001 | Execute REST integration (200 OK) | REST config exists | POST execute | Response returned |
| TC‑IEX‑002 | TS‑IEX‑001 | Execute REST integration (404) | REST config exists | POST execute | Error surfaced cleanly |
| TC‑IEX‑003 | TS‑IEX‑001 | Execute REST integration (500) | REST config exists | POST execute | Error surfaced cleanly |
| TC‑IEX‑004 | TS‑IEX‑001 | Execute REST integration (timeout) | REST config exists | POST execute | Timeout handled |
| TC‑IEX‑005 | TS‑IEX‑001 | Execute REST integration (slow response) | REST config exists | POST execute | Within timeout threshold |
| TC‑IEX‑006 | TS‑IEX‑001 | Execute REST integration (invalid JSON) | REST config exists | POST execute | 422 error |
| TC‑IEX‑007 | TS‑IEX‑002 | Execute SQL integration (valid query) | SQL config exists | POST execute | Rows returned |
| TC‑IEX‑008 | TS‑IEX‑002 | Execute SQL integration (invalid query) | SQL config exists | POST execute | 400 error |
| TC‑IEX‑009 | TS‑IEX‑002 | Execute SQL integration (timeout) | SQL config exists | POST execute | Timeout handled |
| TC‑IEX‑010 | TS‑IEX‑002 | Execute SQL integration (connection failure) | SQL config exists | POST execute | Error surfaced |
| TC‑IEX‑011 | TS‑IEX‑003 | Log sanitization | Integration executed | Inspect logs | No secrets present |
| TC‑IEX‑012 | TS‑IEX‑003 | Retry logic | Integration fails transiently | Execute | Retries applied |
| TC‑IEX‑013 | TS‑IEX‑001 | Execute integration cross-workspace | Integration in W1, assistant in W2 | Execute | 403 forbidden |
| TC‑IEX‑014 | TS‑IEX‑001 | Execute deleted integration | Integration deleted | Execute | 404 error |
| TC‑IEX‑015 | TS‑IEX‑001 | Execute integration with unicode payload | Integration exists | Execute | Success |
| TC‑IEX‑016 | TS‑IEX‑001 | Execute integration with large payload | Integration exists | Execute | Within limits |
| TC‑IEX‑017 | TS‑IEX‑001 | Execute integration with missing required fields | Integration exists | Execute | 400 error |
| TC‑IEX‑018 | TS‑IEX‑001 | Execute integration with malformed JSON | Integration exists | Execute | 400 error |
| TC‑IEX‑019 | TS‑IEX‑002 | SQL integration returns no rows | SQL config exists | Execute | Empty result |
| TC‑IEX‑020 | TS‑IEX‑002 | SQL integration returns large dataset | SQL config exists | Execute | Performance threshold met |

