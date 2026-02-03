"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedImagePage = embedImagePage;
async function embedImagePage(workspaceId, chunkId, imagePath) {
    const providerId = await getWorkspaceEmbeddingProvider(workspaceId);
    const vector = await generateEmbeddingById(providerId, imagePath, {
        isImage: true
    });
    await pool.query(`
    INSERT INTO embeddings (id, chunk_id, vector, created_at)
    VALUES (gen_random_uuid(), $1, $2, NOW())
    ON CONFLICT (chunk_id) DO UPDATE
      SET vector = EXCLUDED.vector,
          created_at = EXCLUDED.created_at
    `, [chunkId, vector]);
}
