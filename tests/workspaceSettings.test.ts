import request from "supertest";
import { app } from "../backend/src/server";

describe("Workspace Settings API", () => {
  it("sets and retrieves a workspace setting", async () => {
    const workspaceId = "11111111-1111-1111-1111-111111111111";

    await request(app)
      .post(`/workspaces/${workspaceId}/settings/theme`)
      .send({ value: "dark" })
      .expect(200);

    const res = await request(app)
      .get(`/workspaces/${workspaceId}/settings/theme`)
      .expect(200);

    expect(res.body.value).toBe("dark");
  });
});
