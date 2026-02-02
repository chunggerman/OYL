CREATE TABLE IF NOT EXISTS workspace_settings (
  id UUID PRIMARY KEY,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  embedding_provider TEXT NOT NULL,
  llm_provider TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS workspace_settings_workspace_id_idx
  ON workspace_settings (workspace_id);

-- Seed defaults for existing workspaces
INSERT INTO workspace_settings (id, workspace_id, embedding_provider, llm_provider, created_at, updated_at)
SELECT
  gen_random_uuid(),
  w.id,
  'ollama:nomic-embed-text',
  'ollama:qwen2.5:14b',
  NOW(),
  NOW()
FROM workspaces w
LEFT JOIN workspace_settings ws ON ws.workspace_id = w.id
WHERE ws.id IS NULL;
