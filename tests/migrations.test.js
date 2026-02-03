"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
describe("Database migrations", () => {
    const db = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL
    });
    afterAll(async () => {
        await db.end();
    });
    it("runs migrations without errors", () => {
        expect(() => {
            (0, child_process_1.execSync)("npm run migrate", { stdio: "inherit" });
        }).not.toThrow();
    });
    it("workspace_settings table exists", async () => {
        const result = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_name = 'workspace_settings'
    `);
        expect(result.rows.length).toBe(1);
    });
});
