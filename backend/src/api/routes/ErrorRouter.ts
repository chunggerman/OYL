import { Router } from "express";

const router = Router();

router.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default router;
