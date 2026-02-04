import { pool } from "../../db";
import {
  Ingestion,
  CreateIngestionInput,
  UpdateIngestionStatusInput,
} from "../entities/Ingestion";
import { IngestionRepository } from "./IngestionRepository";

export class PostgresIngestionRepository implements IngestionRepository {
  private mapRow(row: any): Ingestion {
    return {
      id: row.id,
      datasourceId: row.datasource_id,
      status: row.status,
      errorMessage: row.error_message,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async listByDatasource(datasourceId: string): Promise<Ingestion[]> {
    const result = await pool.query(
      "SELECT * FROM ingestions WHERE datasource_id = $1 ORDER BY created_at DESC",
      [datasourceId]
    );
    return result.rows.map((r) => this.mapRow(r));
  }

  async create(input: CreateIngestionInput): Promise<Ingestion> {
    const result = await pool.query(
      "INSERT INTO ingestions (datasource_id, status) VALUES ($1, 'pending') RETURNING *",
      [input.datasourceId]
    );
    return this.mapRow(result.rows[0]);
  }

  async getById(id: string): Promise<Ingestion | null> {
    const result = await pool.query(
      "SELECT * FROM ingestions WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async updateStatus(id: string, input: UpdateIngestionStatusInput): Promise<Ingestion | null> {
    const result = await pool.query(
      "UPDATE ingestions SET status = $1, error_message = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [input.status, input.errorMessage ?? null, id]
    );
    if (result.rows.length === 0) return null;
    return this.mapRow(result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    await pool.query("DELETE FROM ingestions WHERE id = $1", [id]);
  }
}
