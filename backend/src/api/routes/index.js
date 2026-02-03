"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../../db");
const router = (0, express_1.Router)();
router.post("/workspaces/:id/settings/:key", async (req, res) => {
    const { id, key } = req.params;
    const { value } = req.body;
    await db_1.pool.query(`INSERT INTO workspace_settings (workspace_id, "key", "value")
     VALUES ($1, $2, $3)
     ON CONFLICT (workspace_id, "key")
     DO UPDATE SET "value" = EXCLUDED."value"`, [id, key, value]);
    res.status(200).json({ ok: true });
});
router.get("/workspaces/:id/settings/:key", async (req, res) => {
    const { id, key } = req.params;
    const result = await db_1.pool.query(`SELECT "value" FROM workspace_settings
     WHERE workspace_id = $1 AND "key" = $2`, [id, key]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: "Not found" });
    }
    res.status(200).json({ value: result.rows[0]["value"] });
});
exports.default = router;
