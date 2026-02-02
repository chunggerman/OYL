CREATE TABLE documents (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces(id),
  reference_id UUID REFERENCES reference_items(id),
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_documents_workspace_id ON documents (workspace_id);
CREATE INDEX idx_documents_reference_id ON documents (reference_id);
CREATE INDEX idx_documents_deleted_at ON documents (deleted_at);
