import { Router } from "express";

export const healthRoutes = Router();

healthRoutes.get("/live", (req, res) => {
  res.json({ status: "live" });
});

healthRoutes.get("/ready", (req, res) => {
  res.json({ status: "ready" });
});
