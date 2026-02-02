const fs = require("fs");
const path = require("path");

function write(filePath, content) {
  const fullPath = path.join(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log("Created:", filePath);
}

// --- DB helper ---
write("backend/src/db/index.ts", `
import { Pool } from "pg";

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
`);

// --- Tenant entity ---
write("backend/src/domain/entities/Tenant.ts", `
export interface Tenant {
  id: string;
  name: string;
  metadataJson: any | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
`);

// (…you can continue adding more write() calls here…)

