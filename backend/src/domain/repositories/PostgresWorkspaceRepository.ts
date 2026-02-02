import { db } from "../../db";
import { Workspace } from "../entities/Workspace";
import { WorkspaceRepository } from "./WorkspaceRepository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  async findById(id: string): Promise<Workspace | null> {
    const result = await db.query(
      `SELECT id, tenant_id, name, created_at, updated_at, deleted_at
       FROM workspaces
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }

  async findByTenant(tenantId: string): Promise<Workspace[]> {
    const result = await db.query(
      `SELECT id, tenant_id, name, created_at, updated_at, deleted_at
       FROM workspaces
       WHERE tenant_id = $1 AND deleted_at IS NULL`,
      [tenantId]
    );
    return result.rows.map((row) => ({
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    }));
  }

  async create(workspace: Workspace): Promise<void> {
    await db.query(
      `INSERT INTO workspaces (id, tenant_id, name, created_at, updated_at, deleted_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        workspace.id,
        workspace.tenantId,
        workspace.name,
        workspace.createdAt,
        workspace.updatedAt,
        workspace.deletedAt,
      ]
    );
  }
}
