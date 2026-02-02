CREATE TABLE tags (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces(id),
  reference_id UUID REFERENCES reference_items(id),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_tags_workspace_id ON tags (workspace_id);
CREATE INDEX idx_tags_reference_id ON tags (reference_id);
CREATE INDEX idx_tags_deleted_at ON tags (deleted_at);
