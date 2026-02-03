"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DataSourceService_1 = require("../services/DataSourceService");
const PostgresDataSourceRepository_1 = require("../domain/repositories/PostgresDataSourceRepository");
const router = express_1.default.Router();
const service = new DataSourceService_1.DataSourceService(new PostgresDataSourceRepository_1.PostgresDataSourceRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const ds = await service.getDataSource(req.params.id);
        if (!ds)
            return res.status(404).json({ message: "Not found" });
        res.json(ds);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
