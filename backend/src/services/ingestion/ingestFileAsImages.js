"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestFileAsImages = ingestFileAsImages;
const db_1 = require("../../db");
const documentToImages_1 = require("./documentToImages");
const embeddingService_1 = require("../rag/embeddingService");
const ocrService_1 = require("./ocrService");
const STORAGE_ROOT = process.env.STORAGE_ROOT || "storage";
async function ingestFileAsImages(workspaceId, documentId, filePath) {
    const client = await db_1.pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(`
      DELETE FROM embeddings
      WHERE chunk_id IN (
        SELECT id FROM chunks WHERE document_id = $1
      )
      `, [documentId]);
        await client.query(`DELETE FROM chunks WHERE document_id = $1`, [documentId]);
        const imagePaths = await (0, documentToImages_1.documentToImages)(workspaceId, documentId, filePath, STORAGE_ROOT);
        let position = 0;
        const chunkIds = [];
        for (const imagePath of imagePaths) {
            const res = await client.query(`
        INSERT INTO chunks
          (id, document_id, workspace_id, position, text, created_at)
        VALUES
          (gen_random_uuid(), $1, $2, $3, $4, NOW())
        RETURNING id
        `, [documentId, workspaceId, position, imagePath]);
            const chunkId = res.rows[0].id;
            chunkIds.push(chunkId);
            position += 1;
        }
        await client.query("COMMIT");
        for (let i = 0; i < imagePaths.length; i++) {
            const chunkId = chunkIds[i];
            const imagePath = imagePaths[i];
            await (0, embeddingService_1.embedImagePage)(workspaceId, chunkId, imagePath);
            const ocrText = await (0, ocrService_1.extractOcrTextLLM)(workspaceId, imagePath);
            await db_1.pool.query(`
        UPDATE chunks
        SET text = $1
        WHERE id = $2
        `, [ocrText, chunkId]);
        }
    }
    catch (err) {
        await client.query("ROLLBACK");
        throw err;
    }
    finally {
        client.release();
    }
}
