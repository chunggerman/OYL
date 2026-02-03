"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("Database connectivity", () => {
    it("connects to the database", async () => {
        const db = new pg_1.Pool({
            connectionString: process.env.DATABASE_URL
        });
        const result = await db.query("SELECT NOW()");
        expect(result.rows.length).toBe(1);
        await db.end();
    });
});
