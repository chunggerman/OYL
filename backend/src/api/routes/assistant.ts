
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
