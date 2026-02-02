-- File: OYL/infra/db/migrations/011_create_integration_configs.sql

CREATE TABLE integration_configs (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  type_enum integration_type_enum NOT NULL,
  config_encrypted_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_integration_configs_workspace_id
  ON integration_configs (workspace_id);

CREATE INDEX idx_integration_configs_deleted_at
  ON integration_configs (deleted_at);
