import { pool } from "../../db";
import { DocumentRepository } from "./DocumentRepository";
import { Document } from "../entities/Document";
import { DocumentSource } from "../entities/DocumentSource";
import { Ingestion } from "../entities/IngestionJob";

export class PostgresDocumentRepository implements DocumentRepository {
  async createSource(source: DocumentSource): Promise<void> {
    await pool.query(
      `INSERT INTO uploaded_document_sources
       (id, workspace_id, filename, mimetype, size, storage_path, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        source.id,
        source.workspaceId,
        source.filename,
        source.mimetype,
        source.size,
        source.storagePath,
        source.createdAt,
      ]
    );
  }

  async createDocument(doc: Document): Promise<void> {
    await pool.query(
      `INSERT INTO documents
       (id, workspace_id, document_source_id, status, metadata, created_at)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        doc.id,
        doc.workspaceId,
        doc.documentSourceId,
        doc.status,
        doc.metadata,
        doc.createdAt,
      ]
    );
  }

  async createIngestionJob(job: Ingestion): Promise<void> {
    await pool.query(
      `INSERT INTO ingestion_jobs
       (id, document_id, status, error_message, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        job.id,
        job.datasourceId,
        job.status,
        job.errorMessage,
        job.createdAt,
        job.updatedAt,
      ]
    );
  }

  async getDocumentById(id: string): Promise<Document | null> {
    const res = await pool.query(`SELECT * FROM documents WHERE id=$1`, [id]);
    return res.rows[0] || null;
  }

  async listDocumentsByWorkspace(workspaceId: string): Promise<Document[]> {
    const res = await pool.query(
      `SELECT * FROM documents
       WHERE workspace_id=$1
       ORDER BY created_at DESC`,
      [workspaceId]
    );
    return res.rows;
  }

  async deleteDocument(id: string): Promise<void> {
    await pool.query(`DELETE FROM documents WHERE id=$1`, [id]);
  }
}
