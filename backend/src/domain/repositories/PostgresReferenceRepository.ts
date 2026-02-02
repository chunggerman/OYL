import { db } from "../../db";
import { Reference } from "../entities/Reference";
import { ReferenceRepository } from "./ReferenceRepository";

export class PostgresReferenceRepository implements ReferenceRepository {
  async findById(id: string): Promise<Reference | null> {
    const result = await db.query(
      `SELECT id, workspace_id, name, description, created_at, updated_at, deleted_at
       FROM references
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }

  async findByWorkspace(workspaceId: string): Promise<Reference[]> {
    const result = await db.query(
      `SELECT id, workspace_id, name, description, created_at, updated_at, deleted_at
       FROM references
       WHERE workspace_id = $1 AND deleted_at IS NULL`,
      [workspaceId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      workspaceId: row.workspace_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    }));
  }

  async create(reference: Reference): Promise<void> {
    await db.query(
      `INSERT INTO references (id, workspace_id, name, description, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        reference.id,
        reference.workspaceId,
        reference.name,
        reference.description,
        reference.createdAt,
        reference.updatedAt,
        reference.deletedAt,
      ]
    );
  }
}
