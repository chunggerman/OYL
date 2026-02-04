import { pool } from "../../db";
import {
  FileUpload,
  CreateFileUploadInput,
} from "../entities/FileUpload";
import { FileUploadRepository } from "./FileUploadRepository";

export class PostgresFileUploadRepository implements FileUploadRepository {
  private mapRow(row: any): FileUpload {
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      filename: row.filename,
      mimetype: row.mimetype,
      size: row.size,
      storagePath: row.storage_path,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async listByWorkspace(workspaceId: string): Promise<FileUpload[]> {
    const result = await pool.query(
      "SELECT * FROM file_uploads WHERE workspace_id = $1 ORDER BY created_at DESC",
      [workspaceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateFileUploadInput): Promise<FileUpload> {
    const result = await pool.query(
      "INSERT INTO file_uploads (workspace_id, filename, mimetype, size, storage_path) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        input.workspaceId,
        input.filename,
        input.mimetype,
        input.size,
        input.storagePath,
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<FileUpload | null> {
    const result = await pool.query(
      "SELECT * FROM file_uploads WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM file_uploads WHERE id = $1", [id]);
  }
}
