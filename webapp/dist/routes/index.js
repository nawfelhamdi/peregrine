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
const router = (0, express_1.Router)();
router.use("/api/v1/projects", projects_1.default);
router.use("/api/v1/piplines", pipelines_1.default);
router.use("/api/v1/archives", archives_1.default);
router.use("/api/v1/governance", governance_1.default);
exports.default = router;
