-- File: OYL/infra/db/migrations/014_create_audit_logs.sql

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants (id),
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  user_id UUID,
  action TEXT NOT NULL,
  payload_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_tenant_workspace
  ON audit_logs (tenant_id, workspace_id, created_at);
