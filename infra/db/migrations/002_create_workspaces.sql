-- File: OYL/infra/db/migrations/002_create_workspaces.sql

CREATE TABLE workspaces (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants (id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_workspaces_tenant_id ON workspaces (tenant_id);
CREATE INDEX idx_workspaces_deleted_at ON workspaces (deleted_at);
