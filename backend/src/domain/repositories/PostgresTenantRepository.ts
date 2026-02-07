import { pool } from "../../db";
import {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../entities/Tenant";
import { TenantRepository } from "./TenantRepository";

export class PostgresTenantRepository implements TenantRepository {
  async listByUser(ownerId: string): Promise<Tenant[]> {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE owner_id = $1",
      [ownerId]
    );
    return result.rows;
  }

  async create(input: CreateTenantInput): Promise<Tenant> {
    const metadataEncrypted =
      input.metadata !== undefined && input.metadata !== null
        ? JSON.stringify(input.metadata)
        : null;

    const result = await pool.query(
      `INSERT INTO tenants (name, metadata_encrypted, owner_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [input.name, metadataEncrypted, input.ownerId]
    );
    return result.rows[0];
  }

  async getById(id: string): Promise<Tenant | null> {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: string, input: UpdateTenantInput): Promise<Tenant | null> {
    const existingResult = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
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

    const newMetadataEncrypted =
      input.metadata !== undefined && input.metadata !== null
        ? JSON.stringify(input.metadata)
        : existing.metadata_encrypted;

    const result = await pool.query(
      `UPDATE tenants
         SET name = $1,
             metadata_encrypted = $2,
             updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [newName, newMetadataEncrypted, id]
    );

    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await pool.query(
      `UPDATE tenants
         SET deleted_at = NOW()
       WHERE id = $1`,
      [id]
    );
  }
}
