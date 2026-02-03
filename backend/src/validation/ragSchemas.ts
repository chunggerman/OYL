import { z } from "zod";

export const ragQuerySchema = z.object({
  workspaceId: z.string(),
  query: z.string().min(1),
});
