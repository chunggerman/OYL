import { pool } from "../../db";
import {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../entities/Workspace";
import { WorkspaceRepository } from "./WorkspaceRepository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  async getById(id: string): Promise<Workspace | null> {
    const result = await pool.query(
      "SELECT * FROM workspaces WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async listByUser(userId: string): Promise<Workspace[]> {
    const result = await pool.query(
      "SELECT * FROM workspaces WHERE owner_id = $1",
      [userId]
    );
    return result.rows;
  }

  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    const metadata =
      input.metadata !== undefined && input.metadata !== null
        ? JSON.stringify(input.metadata)
        : null;

    const result = await pool.query(
      `INSERT INTO workspaces (owner_id, name, metadata)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [input.ownerId, input.name, metadata]
    );

    return result.rows[0];
  }

  async update(
    id: string,
    input: UpdateWorkspaceInput
  ): Promise<Workspace | null> {
    const existingResult = await pool.query(
      "SELECT * FROM workspaces WHERE id = $1",
      [id]
    );

    if (existingResult.rows.length === 0) {
      return null;
    }

    const existing = existingResult.rows[0];

    const newName =
      input.name !== undefined && input.name !== null
        ? input.name
        : existing.name;

    const newMetadata =
      input.metadata !== undefined && input.metadata !== null
        ? JSON.stringify(input.metadata)
        : existing.metadata;

    const result = await pool.query(
      `UPDATE workspaces
         SET name = $1,
             metadata = $2,
             updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [newName, newMetadata, id]
    );

    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await pool.query(
      `UPDATE workspaces
         SET deleted_at = NOW()
       WHERE id = $1`,
      [id]
    );
  }
}
