export async function embedImagePage(
  workspaceId: string,
  chunkId: string,
  imagePath: string
): Promise<void> {
  const providerId = await getWorkspaceEmbeddingProvider(workspaceId);

  const vector = await generateEmbeddingById(providerId, imagePath, {
    isImage: true
  });

  await pool.query(
    `
    INSERT INTO embeddings (id, chunk_id, vector, created_at)
    VALUES (gen_random_uuid(), $1, $2, NOW())
    ON CONFLICT (chunk_id) DO UPDATE
      SET vector = EXCLUDED.vector,
          created_at = EXCLUDED.created_at
    `,
    [chunkId, vector]
  );
}
