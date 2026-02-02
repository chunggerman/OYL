const fs = require("fs");
const path = require("path");

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
  console.log("Created:", filePath);
}

// ------------------------------
// File contents
// ------------------------------

const apiIndex = `
import express from "express";
import ingestionRoutes from "./routes/ingestion";
import searchRoutes from "./routes/search";
import tagRoutes from "./routes/tags";
import assistantRoutes from "./routes/assistant";
import workflowRoutes from "./routes/workflows";
import integrationRoutes from "./routes/integrations";
import auditRoutes from "./routes/audit";

const router = express.Router();

router.use("/ingest", ingestionRoutes);
router.use("/search", searchRoutes);
router.use("/tags", tagRoutes);
router.use("/assistant", assistantRoutes);
router.use("/workflows", workflowRoutes);
router.use("/integrations", integrationRoutes);
router.use("/audit", auditRoutes);

export default router;
`;

const ingestionRoute = `
import express from "express";
import { Pool } from "pg";
import { ingestDocument } from "../../ingestion/ingestDocument";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, title, content } = req.body;

  const result = await ingestDocument(db, workspaceId, title, content);
  res.json(result);
});

export default router;
`;

const searchRoute = `
import express from "express";
import { Pool } from "pg";
import { search } from "../../search/search";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, embedding, filters } = req.body;

  const result = await search(db, workspaceId, embedding, filters || {});
  res.json(result);
});

export default router;
`;

const tagsRoute = `
import express from "express";
import { Pool } from "pg";
import { createTag } from "../../tags/createTag";
import { listTags } from "../../tags/listTags";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, name } = req.body;
  const tag = await createTag(db, workspaceId, name);
  res.json(tag);
});

router.get("/:workspaceId", async (req, res) => {
  const tags = await listTags(db, req.params.workspaceId);
  res.json(tags);
});

export default router;
`;

const assistantRoute = `
import express from "express";
import { Pool } from "pg";
import { runAssistant } from "../../assistant/runAssistant";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/:assistantId", async (req, res) => {
  const { assistantId } = req.params;
  const { message } = req.body;

  const result = await runAssistant(db, assistantId, message);
  res.json(result);
});

export default router;
`;

const workflowsRoute = `
import express from "express";
import { Pool } from "pg";
import { createWorkflow } from "../../workflows/createWorkflow";
import { addStep } from "../../workflows/addStep";
import { executeWorkflow } from "../../workflows/executeWorkflow";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, name } = req.body;
  const wf = await createWorkflow(db, workspaceId, name);
  res.json(wf);
});

router.post("/:workflowId/steps", async (req, res) => {
  const { workflowId } = req.params;
  const { stepType, config, order } = req.body;

  const step = await addStep(db, workflowId, stepType, config, order);
  res.json(step);
});

router.post("/:workflowId/execute", async (req, res) => {
  const { workflowId } = req.params;
  const result = await executeWorkflow(db, workflowId);
  res.json(result);
});

export default router;
`;

const integrationsRoute = `
import express from "express";
import { Pool } from "pg";
import { registerIntegration } from "../../integrations/registerIntegration";
import { runIntegration } from "../../integrations/runIntegration";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req, res) => {
  const { workspaceId, type, config } = req.body;
  const integration = await registerIntegration(db, workspaceId, type, config);
  res.json(integration);
});

router.post("/:integrationId/run", async (req, res) => {
  const { integrationId } = req.params;
  const result = await runIntegration(db, integrationId);
  res.json(result);
});

export default router;
`;

const auditRoute = `
import express from "express";
import { Pool } from "pg";
import { listAuditLogs } from "../../audit/listAuditLogs";

const router = express.Router();
const db = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/:workspaceId", async (req, res) => {
  const logs = await listAuditLogs(db, req.params.workspaceId);
  res.json(logs);
});

export default router;
`;

const testApi = `
import express from "express";
import api from "../backend/src/api";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", api);

const port = 4000;
app.listen(port, () => {
  console.log("API server running on port", port);
});
`;

// ------------------------------
// Write files
// ------------------------------

writeFile("backend/src/api/index.ts", apiIndex);
writeFile("backend/src/api/routes/ingestion.ts", ingestionRoute);
writeFile("backend/src/api/routes/search.ts", searchRoute);
writeFile("backend/src/api/routes/tags.ts", tagsRoute);
writeFile("backend/src/api/routes/assistant.ts", assistantRoute);
writeFile("backend/src/api/routes/workflows.ts", workflowsRoute);
writeFile("backend/src/api/routes/integrations.ts", integrationsRoute);
writeFile("backend/src/api/routes/audit.ts", auditRoute);
writeFile("scripts/test-api.ts", testApi);

console.log("API layer scaffolding complete.");
