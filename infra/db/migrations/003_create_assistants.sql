-- File: OYL/infra/db/migrations/003_create_assistants.sql

CREATE TABLE assistants (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  name TEXT NOT NULL,
  instruction TEXT,
  ai_instruction TEXT,
  settings_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_assistants_workspace_id ON assistants (workspace_id);
CREATE INDEX idx_assistants_deleted_at ON assistants (deleted_at);
