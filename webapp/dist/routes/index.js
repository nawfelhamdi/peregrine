"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_1 = __importDefault(require("./projects"));
const pipelines_1 = __importDefault(require("./pipelines"));
const archives_1 = __importDefault(require("./archives"));
const governance_1 = __importDefault(require("./governance"));
const checkAuth = require('../middlewares/checkAuth');
const limiter = require('../middlewares/limiter');
const router = (0, express_1.Router)();
router.use("/api/v1/projects", limiter, checkAuth, projects_1.default);
router.use("/api/v1/piplines", limiter, checkAuth, pipelines_1.default);
router.use("/api/v1/archives", limiter, checkAuth, archives_1.default);
router.use("/api/v1/governance", limiter, checkAuth, governance_1.default);
exports.default = router;
