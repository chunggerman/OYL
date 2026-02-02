import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { randomUUID } from "crypto";

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function seed() {
  console.log("Seeding database...");

  const tenantId = randomUUID();
  const workspaceId = randomUUID();
  const assistantId = randomUUID();
  const referenceId = randomUUID();
  const documentId = randomUUID();

  // TENANT
  await db.query(
    `INSERT INTO tenants (id, name, created_at, updated_at)
     VALUES ($1, 'Demo Tenant', NOW(), NOW())`,
    [tenantId]
  );

  // WORKSPACE
  await db.query(
    `INSERT INTO workspaces (id, tenant_id, name, created_at, updated_at)
     VALUES ($1, $2, 'Demo Workspace', NOW(), NOW())`,
    [workspaceId, tenantId]
  );

  // ASSISTANT
  await db.query(
    `INSERT INTO assistants (id, workspace_id, name, created_at, updated_at)
     VALUES ($1, $2, 'Demo Assistant', NOW(), NOW())`,
    [assistantId, workspaceId]
  );

  // REFERENCE ITEM
  await db.query(
    `INSERT INTO reference_items (id, workspace_id, name, description, created_at, updated_at)
     VALUES ($1, $2, 'Demo Reference', 'Seed reference item', NOW(), NOW())`,
    [referenceId, workspaceId]
  );

  // DOCUMENT
  await db.query(
    `INSERT INTO documents (id, workspace_id, reference_id, title, content, created_at, updated_at)
     VALUES ($1, $2, $3, 'Demo Document', 'This is a seeded document.', NOW(), NOW())`,
    [documentId, workspaceId, referenceId]
  );

  console.log("DONE");
  await db.end();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
