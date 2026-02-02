import { pool } from "../db";
import { splitIntoChunks } from "./splitIntoChunks";

export async function ingestDocument(
  workspaceId: string,
  documentId: string,
  content: string
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      "DELETE FROM chunks WHERE document_id = $1",
      [documentId]
    );

    const chunks = splitIntoChunks(content, {
      maxChunkSize: 1000,
      overlapSize: 200,
      version: 1,
      baseMetadata: { workspace_id: workspaceId, document_id: documentId },
    });

    for (const chunk of chunks) {
      await client.query(
        `INSERT INTO chunks
          (document_id, text, position, length, overlap, hash, version, metadata)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          documentId,
          chunk.content,
          chunk.position,
          chunk.length,
          chunk.overlap,
          chunk.hash,
          chunk.version,
          chunk.metadata,
        ]
      );
    }

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
