-- File: OYL/infra/db/migrations/010_create_data_sources.sql

CREATE TABLE data_sources (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  name TEXT NOT NULL,
  schema_json JSONB,
  row_count INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_data_sources_workspace_id ON data_sources (workspace_id);
CREATE INDEX idx_data_sources_deleted_at ON data_sources (deleted_at);
