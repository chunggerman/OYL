-- File: OYL/infra/db/migrations/009_create_tag_links.sql

CREATE TABLE tag_links (
  id UUID PRIMARY KEY,
  tag_id UUID NOT NULL REFERENCES tags (id),
  chunk_id UUID NOT NULL REFERENCES chunks (id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tag_links_tag_id ON tag_links (tag_id);
CREATE INDEX idx_tag_links_chunk_id ON tag_links (chunk_id);
CREATE UNIQUE INDEX idx_tag_links_unique
  ON tag_links (tag_id, chunk_id);
