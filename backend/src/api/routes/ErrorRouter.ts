// backend/src/api/routes/ErrorRouter.ts

import { Router, Request, Response, NextFunction } from "express";

const router = Router();

// Global error handler
router.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
);

export default router;
