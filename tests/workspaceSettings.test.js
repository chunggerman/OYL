"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../backend/src/server");
describe("Workspace Settings API", () => {
    it("sets and retrieves a workspace setting", async () => {
        const workspaceId = "11111111-1111-1111-1111-111111111111";
        await (0, supertest_1.default)(server_1.app)
            .post(`/workspaces/${workspaceId}/settings/theme`)
            .send({ value: "dark" })
            .expect(200);
        const res = await (0, supertest_1.default)(server_1.app)
            .get(`/workspaces/${workspaceId}/settings/theme`)
            .expect(200);
        expect(res.body.value).toBe("dark");
    });
});
