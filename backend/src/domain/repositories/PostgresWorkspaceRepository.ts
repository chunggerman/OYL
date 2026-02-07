// backend/src/domain/repositories/PostgresWorkspaceRepository.ts

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
      `SELECT
         id,
         tenant_id AS "tenantId",
         name,
         description,
         created_at AS "createdAt",
         updated_at AS "updatedAt",
         deleted_at AS "deletedAt"
       FROM workspaces
       WHERE id = $1
         AND deleted_at IS NULL`,
      [id]
    );

    return result.rows[0] || null;
  }

  async listByUser(tenantId: string): Promise<Workspace[]> {
    const result = await pool.query(
      `SELECT
         id,
         tenant_id AS "tenantId",
         name,
         description,
         created_at AS "createdAt",
         updated_at AS "updatedAt",
         deleted_at AS "deletedAt"
       FROM workspaces
       WHERE tenant_id = $1
         AND deleted_at IS NULL
       ORDER BY created_at DESC`,
      [tenantId]
    );

    return result.rows;
  }

  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    const description =
      input.description !== undefined && input.description !== null
        ? input.description
        : null;

    const result = await pool.query(
      `INSERT INTO workspaces (tenant_id, name, description)
       VALUES ($1, $2, $3)
       RETURNING
         id,
         tenant_id AS "tenantId",
         name,
         description,
         created_at AS "createdAt",
         updated_at AS "updatedAt",
         deleted_at AS "deletedAt"`,
      [input.tenantId, input.name, description]
    );

    return result.rows[0];
  }

  async update(
    id: string,
    input: UpdateWorkspaceInput
  ): Promise<Workspace | null> {
    const existingResult = await pool.query(
      `SELECT
         id,
         tenant_id AS "tenantId",
         name,
         description,
         created_at AS "createdAt",
         updated_at AS "updatedAt",
         deleted_at AS "deletedAt"
       FROM workspaces
       WHERE id = $1
         AND deleted_at IS NULL`,
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

    const newDescription =
      input.description !== undefined && input.description !== null
        ? input.description
        : existing.description;

    const result = await pool.query(
      `UPDATE workspaces
         SET name = $1,
             description = $2,
             updated_at = NOW()
       WHERE id = $3
       RETURNING
         id,
         tenant_id AS "tenantId",
         name,
         description,
         created_at AS "createdAt",
         updated_at AS "updatedAt",
         deleted_at AS "deletedAt"`,
      [newName, newDescription, id]
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
