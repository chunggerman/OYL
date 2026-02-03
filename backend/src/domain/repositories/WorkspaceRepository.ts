import { pool } from "../../db";
import { Workspace } from "../entities/Workspace";

export class WorkspaceRepository {
  async create(tenantId: string, name: string, description: string | null): Promise<Workspace> {
    const result = await pool.query(
      `
      INSERT INTO workspaces (id, tenant_id, name, description)
      VALUES (gen_random_uuid(), $1, $2, $3)
      RETURNING id, tenant_id, name, description, created_at, updated_at, deleted_at
      `,
      [tenantId, name, description]
    );
    return this.mapRow(result.rows[0]);
  }

  async findById(id: string): Promise<Workspace | null> {
    const result = await pool.query(
      `
      SELECT id, tenant_id, name, description, created_at, updated_at, deleted_at
      FROM workspaces
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
    if (result.rowCount === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async listByTenant(tenantId: string): Promise<Workspace[]> {
    const result = await pool.query(
      `
      SELECT id, tenant_id, name, description, created_at, updated_at, deleted_at
      FROM workspaces
      WHERE tenant_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
      `,
      [tenantId]
    );
    return result.rows.map((row) => this.mapRow(row));
  }

  async softDelete(id: string): Promise<void> {
    await pool.query(
      `
      UPDATE workspaces
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
  }

  private mapRow(row: any): Workspace {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}
