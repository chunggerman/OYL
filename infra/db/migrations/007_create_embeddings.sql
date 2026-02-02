-- File: OYL/infra/db/migrations/007_create_embeddings.sql

CREATE TABLE embeddings (
  id UUID PRIMARY KEY,
  chunk_id UUID NOT NULL REFERENCES chunks (id),
  vector_ref TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_embeddings_chunk_id ON embeddings (chunk_id);
CREATE UNIQUE INDEX idx_embeddings_chunk_unique ON embeddings (chunk_id);
