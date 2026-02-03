"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TenantService_1 = require("../services/TenantService");
const PostgresTenantRepository_1 = require("../domain/repositories/PostgresTenantRepository");
const router = express_1.default.Router();
const service = new TenantService_1.TenantService(new PostgresTenantRepository_1.PostgresTenantRepository());
router.get("/:id", async (req, res, next) => {
    try {
        const tenant = await service.getTenant(req.params.id);
        if (!tenant)
            return res.status(404).json({ message: "Not found" });
        res.json(tenant);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
