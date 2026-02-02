CREATE TABLE reference_items (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces (id),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_reference_items_workspace_id ON reference_items (workspace_id);
CREATE INDEX idx_reference_items_deleted_at ON reference_items (deleted_at);
