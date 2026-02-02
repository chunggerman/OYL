import express from "express";
import { DataSourceService } from "../services/DataSourceService";
import { PostgresDataSourceRepository } from "../domain/repositories/PostgresDataSourceRepository";

const router = express.Router();
const service = new DataSourceService(new PostgresDataSourceRepository());

router.get("/:id", async (req, res, next) => {
  try {
    const ds = await service.getDataSource(req.params.id);
    if (!ds) return res.status(404).json({ message: "Not found" });
    res.json(ds);
  } catch (err) {
    next(err);
  }
});

export default router;
