-- File: OYL/infra/db/migrations/012_create_workflows.sql

CREATE TABLE workflows (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workflows_workspace_id ON workflows (workspace_id);
CREATE INDEX idx_workflows_deleted_at ON workflows (deleted_at);
