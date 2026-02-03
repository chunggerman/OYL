"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const splitIntoChunks_1 = require("../backend/src/ingestion/splitIntoChunks");
const ingestDocument_1 = require("../backend/src/ingestion/ingestDocument");
const db_1 = require("../backend/src/db");
describe("Chunking pipeline", () => {
    it("splits text into overlapping chunks with metadata and hashing", () => {
        const text = "a".repeat(2500);
        const chunks = (0, splitIntoChunks_1.splitIntoChunks)(text, {
            maxChunkSize: 1000,
            overlapSize: 200,
            version: 2,
            baseMetadata: { test: true },
        });
        expect(chunks.length).toBeGreaterThan(1);
        for (let i = 0; i < chunks.length; i++) {
            const c = chunks[i];
            expect(typeof c.content).toBe("string");
            expect(c.length).toBe(c.content.length);
            expect(c.position).toBe(i);
            expect(typeof c.hash).toBe("string");
            expect(c.hash.length).toBeGreaterThan(10);
            expect(c.version).toBe(2);
            expect(c.metadata.test).toBe(true);
        }
    });
    it("ingests document and stores chunks with metadata in DB", async () => {
        const workspaceId = "11111111-1111-1111-1111-111111111111";
        const documentId = "22222222-2222-2222-2222-222222222222";
        const content = "Hello world ".repeat(300);
        await (0, ingestDocument_1.ingestDocument)(workspaceId, documentId, content);
        const result = await db_1.pool.query("SELECT document_id, content, position, length, overlap, hash, version, metadata FROM chunks WHERE document_id = $1 ORDER BY position", [documentId]);
        expect(result.rows.length).toBeGreaterThan(1);
        result.rows.forEach((row, index) => {
            expect(row.document_id).toBe(documentId);
            expect(typeof row.content).toBe("string");
            expect(row.length).toBe(row.content.length);
            expect(row.position).toBe(index);
            expect(row.version).toBe(1);
            expect(row.metadata.document_id).toBe(documentId);
            expect(row.metadata.workspace_id).toBe(workspaceId);
        });
    });
});
