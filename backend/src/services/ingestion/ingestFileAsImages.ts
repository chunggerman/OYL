import { pool } from "../../db";
import { documentToImages } from "./documentToImages";
import { embedImagePage } from "../rag/embeddingService";
import { extractOcrTextLLM } from "./ocrService";

const STORAGE_ROOT = process.env.STORAGE_ROOT || "storage";

export async function ingestFileAsImages(
  workspaceId: string,
  documentId: string,
  filePath: string
): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `
      DELETE FROM embeddings
      WHERE chunk_id IN (
        SELECT id FROM chunks WHERE document_id = $1
      )
      `,
      [documentId]
    );

    await client.query(
      `DELETE FROM chunks WHERE document_id = $1`,
      [documentId]
    );

    const imagePaths = await documentToImages(
      workspaceId,
      documentId,
      filePath,
      STORAGE_ROOT
    );

    let position = 0;
    const chunkIds: string[] = [];

    for (const imagePath of imagePaths) {
      const res = await client.query(
        `
        INSERT INTO chunks
          (id, document_id, workspace_id, position, text, created_at)
        VALUES
          (gen_random_uuid(), $1, $2, $3, $4, NOW())
        RETURNING id
        `,
        [documentId, workspaceId, position, imagePath]
      );
      const chunkId = res.rows[0].id as string;
      chunkIds.push(chunkId);
      position += 1;
    }

    await client.query("COMMIT");

    for (let i = 0; i < imagePaths.length; i++) {
      const chunkId = chunkIds[i];
      const imagePath = imagePaths[i];

      await embedImagePage(workspaceId, chunkId, imagePath);

      const ocrText = await extractOcrTextLLM(workspaceId, imagePath);

      await pool.query(
        `
        UPDATE chunks
        SET text = $1
        WHERE id = $2
        `,
        [ocrText, chunkId]
      );
    }
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
