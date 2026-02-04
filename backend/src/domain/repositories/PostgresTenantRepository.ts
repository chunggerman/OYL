import { pool } from "../../db";
import {
  Tenant,
  CreateTenantInput,
  UpdateTenantInput,
} from "../entities/Tenant";
import { TenantRepository } from "./TenantRepository";

export class PostgresTenantRepository implements TenantRepository {

  /**
   * Private Mappers
   */
  private mapRow(row: any): Tenant {
    return {
      id: row.id,
      ownerId: row.owner_id,
      name: row.name,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  /**
   * Public Repository Methods
   */
  async listByOwner(ownerId: string): Promise<Tenant[]> {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE owner_id = $1 ORDER BY created_at DESC",
      [ownerId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateTenantInput): Promise<Tenant> {
    const result = await pool.query(
      "INSERT INTO tenants (owner_id, name, metadata) VALUES ($1, $2, $3) RETURNING *",
      [input.ownerId, input.name, input.metadata ?? null]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Tenant | null> {
    const result = await pool.query(
      "SELECT * FROM tenants WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async update(id: string, input: UpdateTenantInput): Promise<Tenant | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    // Logic: Build dynamic field list for update
    if (input.name !== undefined) {
      fields.push(`name = $${idx}`);
      values.push(input.name);
      idx++;
    }

    if (input.metadata !== undefined) {
      fields.push(`metadata = $${idx}`);
      values.push(input.metadata);
      idx++;
    }

    if (fields.length === 0) {
      return this.getById(id);
    }

    // Add ID to values for the WHERE clause
    values.push(id);

    const query = `
      UPDATE tenants
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $${idx}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM tenants WHERE id = $1", [id]);
  }
}
