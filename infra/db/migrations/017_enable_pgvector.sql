-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to embeddings table
ALTER TABLE embeddings
ADD COLUMN embedding vector(1536);

-- Create IVFFLAT index for similarity search
CREATE INDEX IF NOT EXISTS embeddings_embedding_idx
ON embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
