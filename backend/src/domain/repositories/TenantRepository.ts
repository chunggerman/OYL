import { pool } from "../../db";
import { Tenant } from "../entities/Tenant";

export class TenantRepository {
  async create(name: string, metadataEncrypted: Record<string, any> | null): Promise<Tenant> {
    const result = await pool.query(
      `
      INSERT INTO tenants (id, name, metadata_encrypted)
      VALUES (gen_random_uuid(), $1, $2)
      RETURNING id, name, metadata_encrypted, created_at, updated_at, deleted_at
      `,
      [name, metadataEncrypted]
    );
    return this.mapRow(result.rows[0]);
  }

  async findById(id: string): Promise<Tenant | null> {
    const result = await pool.query(
      `
      SELECT id, name, metadata_encrypted, created_at, updated_at, deleted_at
      FROM tenants
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
    if (result.rowCount === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async list(): Promise<Tenant[]> {
    const result = await pool.query(
      `
      SELECT id, name, metadata_encrypted, created_at, updated_at, deleted_at
      FROM tenants
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      `
    );
    return result.rows.map((row) => this.mapRow(row));
  }

  async softDelete(id: string): Promise<void> {
    await pool.query(
      `
      UPDATE tenants
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
      `,
      [id]
    );
  }

  private mapRow(row: any): Tenant {
    return {
      id: row.id,
      name: row.name,
      metadataEncrypted: row.metadata_encrypted,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}
