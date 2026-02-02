<!-- File: OYL/infra/db/schema.md -->

# OYL Database Schema (Postgres)

## tenants
- id UUID PK
- name text
- metadata_encrypted jsonb
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz (soft delete)

## workspaces
- id UUID PK
- tenant_id UUID FK → tenants.id
- name text
- description text
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## assistants
- id UUID PK
- workspace_id UUID FK → workspaces.id
- name text
- instruction text
- ai_instruction text
- settings_json jsonb
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## references
- id UUID PK
- workspace_id UUID FK → workspaces.id
- name text
- description text
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## documents
- id UUID PK
- reference_id UUID FK → references.id
- filename text
- mime_type text
- size_bytes integer
- metadata_json jsonb
- text text
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## chunks
- id UUID PK
- document_id UUID FK → documents.id
- position integer
- text text
- tags_text text[]
- created_at timestamptz
- deleted_at timestamptz

## embeddings
- id UUID PK
- chunk_id UUID FK → chunks.id
- vector_ref text
- created_at timestamptz

## tags
- id UUID PK
- reference_id UUID FK → references.id
- tag text
- source tag_source_enum
- created_at timestamptz

## tag_links
- id UUID PK
- tag_id UUID FK → tags.id
- chunk_id UUID FK → chunks.id
- created_at timestamptz

## data_sources
- id UUID PK
- workspace_id UUID FK → workspaces.id
- name text
- schema_json jsonb
- row_count integer
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## integration_configs
- id UUID PK
- workspace_id UUID FK → workspaces.id
- type_enum integration_type_enum
- config_encrypted_json jsonb
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## workflows
- id UUID PK
- workspace_id UUID FK → workspaces.id
- name text
- description text
- created_at timestamptz
- updated_at timestamptz
- deleted_at timestamptz

## workflow_steps
- id UUID PK
- workflow_id UUID FK → workflows.id
- position integer
- type_enum workflow_step_type_enum
- assistant_id UUID FK → assistants.id
- instruction text
- config_json jsonb
- created_at timestamptz
- deleted_at timestamptz

## audit_logs
- id UUID PK
- tenant_id UUID FK → tenants.id
- workspace_id UUID FK → workspaces.id
- user_id UUID
- action text
- payload_json jsonb
- created_at timestamptz
