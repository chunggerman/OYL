"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInteraction = logInteraction;
const crypto_1 = require("crypto");
async function logInteraction(db, assistantId, userMessage, assistantResponse) {
    await db.query(`INSERT INTO audit_logs (id, assistant_id, user_message, assistant_response, created_at)
     VALUES ($1, $2, $3, $4, NOW())`, [(0, crypto_1.randomUUID)(), assistantId, userMessage, assistantResponse]);
}
